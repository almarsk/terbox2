from flask import (
    Flask,
    abort,
    render_template,
    session,
    redirect,
    request,
    url_for,
    jsonify
)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import JSON

import os
import secrets
from pathlib import Path
from datetime import datetime
import json

from convproof import validate_flow
from convcore import reply, Flow


app = Flask(__name__, static_url_path='/assets', static_folder='static/assets')

secret_key = os.environ.get("CHATBOT_SECRET_KEY", secrets.token_bytes(32))
db_path = Path(__file__).parent / "chatbot.db"
app.config.update(
    TEMPLATES_AUTO_RELOAD=True,
    SECRET_KEY=secret_key,
    SESSION_COOKIE_SAMESITE="Lax",
    SQLALCHEMY_DATABASE_URI=f"sqlite:///{db_path}",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    BOTS_FOLDER="/bots"
)
db = SQLAlchemy(app)


# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Database


class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nick = db.Column(db.Text, nullable=False)
    flow = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, default=None)
    abort = db.Column(db.Boolean, default=None)
    rating = db.Column(db.Integer, default=None)
    comment = db.Column(db.Text, default=None)


class Reply(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("conversation.id"), nullable=False)
    user_reply = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    reaction_ms = db.Column(db.Integer) # chatbot replies have a NULL reaction_ms
    cstatus = db.Column(JSON)


if not db_path.is_file():
    with app.app_context():
        db.create_all()

# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Handling Requests

@app.route("/admin", methods=("GET", "POST"))
def admin():
    return render_template("index.html", admin="true")

@app.route("/login", methods=["POST"])
def login():
    [nickname, password] = request.get_json()
    return jsonify({"success": nickname == "almarsk" and password == "Sl0nice!"})

@app.route("/list-bots", methods=["GET"])
def list_bots():
    try:
        files = [os.path.splitext(file)[0] for file in os.listdir(f"{os.getcwd()}{app.config['BOTS_FOLDER']}")]
        return jsonify(files)
    except Exception as e:
        print(f"Error listing files: {e}")
        return []

@app.route("/", methods=("GET", "POST"))
def dispatcher():
     flow = request.args.get("flow") or None

     if flow is not None:
         session.clear()
         session["flow"] = flow
         session["phase"] = 0
         return redirect(url_for("dispatcher"))

     if "flow" not in session or not validate_flow("bots", session["flow"]):
         session["flow"] = ""
         session["phase"] = 0
     return render_template("index.html", bot=session["flow"], phase=session["phase"], admin="false")

@app.route("/intro", methods=["POST"])
def intro():
    convo = Conversation(nick=request.get_json()["nick"], flow=session["flow"])
    session["phase"] += 1
    db.session.add(convo)
    db.session.commit()
    session["conversation_id"] = convo.id
    return jsonify({}), 200

@app.route("/start", methods=["POST"])
def start():
    session["phase"] += 1
    return jsonify({}), 200

@app.route("/bot", methods=["POST"])
def bot():
    [user_speech, c_status_in] = request.get_json()
    cstatus_out = reply(user_speech, Flow(app.config.BOTS_PATH, session["flow"]), c_status_in)
    if cstatus_out.end:
        session["phase"] += 1
    return jsonify(cstatus_out.__dict__)

@app.route("/abort", methods=["POST"])
def abort():
    session["abort"] = True
    session["phase"] += 1
    return jsonify({})

@app.route("/outro", methods=["POST"])
def outro():
    [comment, grade] = request.get_json()
    convo = Conversation.query.filter_by(id=session["conversation_id"]).first()
    convo.end_date = datetime.utcnow()
    convo.abort = session.get("abort", False)
    convo.rating = int(grade)
    convo.comment = comment
    db.session.add(convo)
    db.session.commit()

    session["phase"] += 1

    return jsonify({})

if __name__ == "__main__":
    app.run(debug=True)
