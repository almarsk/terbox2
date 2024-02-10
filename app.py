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

from convval import validate_flow
from convform import reply


app = Flask(__name__)
secret_key = os.environ.get("CHATBOT_SECRET_KEY", secrets.token_bytes(32))
db_path = Path(__file__).parent / "chatbot.db"
app.config.update(
    TEMPLATES_AUTO_RELOAD=True,
    SECRET_KEY=secret_key,
    SESSION_COOKIE_SAMESITE="Lax",
    SQLALCHEMY_DATABASE_URI=f"sqlite:///{db_path}",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
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
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    reaction_ms = db.Column(db.Integer) # chatbot replies have a NULL reaction_ms
    cstatus = db.Column(JSON)


if not db_path.is_file():
    with app.app_context():
        db.create_all()

# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Handling Requests

@app.route("/")
def dispatcher():
     flow = request.args.get("flow") or None

     if flow is not None:
         session.clear()
         session["flow"] = flow
         session["phase"] = 0
         return redirect(url_for("dispatcher"))

     if "flow" not in session or not validate_flow("bots", session["flow"]):
         session["flow"] = ""

     return render_template("index.html", bot=session["flow"], phase=session["phase"])

@app.route("/intro")
def intro():
    convo = Conversation(nick=request.get_json()["nick"], flow=session["flow"])
    db.session.add(convo)
    db.session.commit()
    session["phase"] += 1
    return jsonify({}), 200

@app.route("/start")
def start():
    session["phase"] += 1
    return jsonify({}), 200

@app.route("/chat")
def chat():
    [user_speech, cstatus_in] = request.get_json()
    cstatus_out = reply(user_speech, cstatus_in)

    if cstatus_out["end"]:
        session["phase"] += 1

    return jsonify(cstatus_out)

@app.route("/abort")
def abort():
    session["abort"] = True
    session["phase"] += 1
    return jsonify({})

@app.route("/outro")
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
