from flask import Blueprint, request, jsonify
from database import db
from datetime import datetime

create_bp = Blueprint('create', __name__)

@create_bp.route("/create", methods=["POST"])
def create():
    from app import db, Flow, Project
    try:
        item_type, name, flow = request.get_json().values()
    except:
        return jsonify({}), 400

    print(f"taso {item_type, name, flow}")
    if item_type == "flow":
        print(f"creating flow {name}")

        item = Flow(flow_name=name, flow=flow)
        db.session.add(item)
        db.session.commit()
    elif item_type == "project":
        item = Project(project_name=name)
        db.session.add(item)
        db.session.commit()



    return jsonify({}), 200



"""
 item = Flow(flow_name="test_flow", flow={})
 db.add(item)
 db.commit()
"""
