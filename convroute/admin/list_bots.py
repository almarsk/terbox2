from flask import Blueprint, request, jsonify, request
import os
from convproof import validate_flow

list_bot_bp = Blueprint('list_bots', __name__)

@list_bot_bp.route("/list-bots", methods=["POST"])
def list_bots():

    print("lesgo")
    flow_request = request.get_json()

    print(flow_request)

    from app import app
    try:
        file_names = os.listdir(f"{os.getcwd()}/{app.config['BOTS_PATH']}")
    except Exception as e:
        print(f"Error listing files: {e}")
        return []

    if flow_request is None or "flow" not in flow_request:
        files = [
            [os.path.splitext(file)[0], validate_flow(app.config['BOTS_PATH'], os.path.splitext(file)[0])]
            for file
            in file_names
        ]
        return jsonify(files)

    else:
        flow = flow_request["flow"]
        return jsonify(validate_flow(app.config['BOTS_PATH'], flow))
