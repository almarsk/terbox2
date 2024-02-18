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
from convform import convform


app = Flask(__name__, static_url_path='/assets', static_folder='static/assets')

secret_key = os.environ.get("CHATBOT_SECRET_KEY", secrets.token_bytes(32))
db_path = Path(__file__).parent / "chatbot.db"
app.config.update(
    TEMPLATES_AUTO_RELOAD=True,
    SECRET_KEY=secret_key,
    SESSION_COOKIE_SAMESITE="Lax",
    SQLALCHEMY_DATABASE_URI=f"sqlite:///{db_path}",
    SQLALCHEMY_TRACK_MODIFICATIONS=False,
    BOTS_PATH="bots"
)

from database import db
db.init_app(app)


# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Database


class Conversation(db.Model):
    __tablename__ = "conversation"
    id = db.Column(db.Integer, primary_key=True)
    nick = db.Column(db.Text, nullable=False)
    flow = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    end_date = db.Column(db.DateTime, default=None)
    abort = db.Column(db.Boolean, default=None)
    rating = db.Column(db.Integer, default=None)
    comment = db.Column(db.Text, default=None)
    __table_args__ = {'extend_existing': True}


class Reply(db.Model):
    __tablename__ = "reply"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("conversation.id"), nullable=False)
    user_reply = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    reaction_ms = db.Column(db.Integer) # chatbot replies have a NULL reaction_ms
    cstatus = db.Column(JSON)
    __table_args__ = {'extend_existing': True}


if not db_path.is_file():
    with app.app_context():
        db.create_all()


# –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Handling Requests

@app.route('/', defaults={'path': ''}, methods=("GET", "POST"))
@app.route('/<path:path>')
def dispatcher(path):
    if path:
        session.clear()

    flow = request.args.get("flow") or None

    if flow is not None:
        session.clear()
        session["flow"] = flow
        session["phase"] = 0
        return redirect(url_for("dispatcher"))

    success, message = validate_flow("bots", session["flow"] if "flow" in session else "").values()

    if "flow" not in session or not success:
        session["flow"] = ""
        session["phase"] = 0

    return render_template(
        "index.html",
        bot=session["flow"] if "flow" in session else "",
        phase=session["phase"] if "phase" in session else 0)

# conversation endpoints
from convroute.intro import intro_bp
app.register_blueprint(intro_bp)
from convroute.start import start_bp
app.register_blueprint(start_bp)
from convroute.bot import bot_bp
app.register_blueprint(bot_bp)
from convroute.abort import abort_bp, is_aborted_bp
app.register_blueprint(abort_bp)
app.register_blueprint(is_aborted_bp)
from convroute.outro import outro_bp
app.register_blueprint(outro_bp)

# admin endpoints
from convroute.admin.call_convform import convform_bp
app.register_blueprint(convform_bp)
from convroute.admin.login import login_bp
app.register_blueprint(login_bp)
from convroute.admin.list_bots import list_bot_bp
app.register_blueprint(list_bot_bp)

if __name__ == "__main__":
    app.run(debug=True)
