from flask import Blueprint, session, request, jsonify
from database import db

from convcore import reply, Flow

bot_bp = Blueprint('bot', __name__)

@bot_bp.route("/bot", methods=["POST"])
def bot():
    from app import app
    [user_speech, c_status_in] = request.get_json()
    cstatus_out = reply(user_speech, Flow(session["flow"]), c_status_in)
    if cstatus_out.end:
        session["phase"] += 1
    return jsonify(cstatus_out.__dict__)
