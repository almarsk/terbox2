from flask import Blueprint, session, request, jsonify

abort_bp = Blueprint('abort', __name__)

@abort_bp.route("/abort", methods=["POST"])
def abort():
    session["abort"] = True
    session["phase"] += 1
    return jsonify({})
