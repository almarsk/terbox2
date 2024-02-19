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

    if item_type == "flow":
        if Flow.query.filter_by(flow_name=name).first():
            return jsonify({"success": False, "message": "there is a flow of that name already"})

        print(f"creating flow {name}")
        item = Flow(flow_name=name, flow=flow)
        db.session.add(item)
        db.session.commit()
    elif item_type == "project":
        if Project.query.filter_by(project_name=name).first():
            return jsonify({"success": False, "message": "there is a flow of that name already"})
        item = Project(project_name=name)
        db.session.add(item)
        db.session.commit()



    return jsonify({}), 200



"""
 item = Flow(flow_name="test_flow", flow={})
 db.add(item)
 db.commit()
"""
