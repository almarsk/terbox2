from flask import Blueprint, request, jsonify
import os

list_bot_bp = Blueprint('list_bots', __name__)

@list_bot_bp.route("/list-bots", methods=["GET"])
def list_bots():
    from app import app
    try:
        files = [
            os.path.splitext(file)[0]
            for file
            in os.listdir(f"{os.getcwd()}{app.config['BOTS_PATH']}")
        ]
        return jsonify(files)
    except Exception as e:
        print(f"Error listing files: {e}")
        return []
