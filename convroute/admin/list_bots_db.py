from flask import Blueprint, request, jsonify, request
import sqlite3
import os
from convproof import validate_flow

list_bot_bp = Blueprint('list_bots', __name__)

@list_bot_bp.route("/list-bots", methods=["POST"])
def list_bots():
    flow_request = request.get_json()

    from app import app, db, Flow
    try:
        conn = sqlite3.connect('chatbot.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Flow")
        flows = cursor.fetchall()
        for flow in flows:
            print(flow)  # Or do something else with each row

        # Close the cursor and the database connection
        cursor.close()
        conn.close()

        flow_names = [row[0] for row in cursor.fetchall()]

    except Exception as e:
        print(f"Error listing files: {e}")
        return []

    if flow_request is None or "flow" not in flow_request:
        files = [
            [os.path.splitext(file)[0], validate_flow(app.config['BOTS_PATH'], os.path.splitext(file)[0])]
            for file
            in flow_names
        ]
        return jsonify(files)

    else:
        flow = flow_request["flow"]
        return jsonify(validate_flow(app.config['BOTS_PATH'], flow))
