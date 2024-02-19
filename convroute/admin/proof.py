from flask import Blueprint, request, jsonify, request
import os
from convproof import validate_flow

proof_bp = Blueprint('proof', __name__)

@proof_bp.route("/proof", methods=["POST"])
def proof():
    flow_request = request.get_json()
    flow = flow_request["flow"] if "flow" in flow_request else ""
    from app import app

    print(flow)

    try:
        return jsonify(validate_flow(app.config['BOTS_PATH'], flow))

    except Exception as e:
        print(f"db issues: {e}")
        return jsonify({})
