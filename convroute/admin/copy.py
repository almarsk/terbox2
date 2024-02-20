from flask import Blueprint, request, jsonify
from database import db
from datetime import datetime

copy_flow_bp = Blueprint('copy_flow', __name__)

@copy_flow_bp.route("/copy_flow", methods=["POST"])
def copy_flow():
    from app import db, Flow, Project
    try:
        name, = request.get_json().values()
    except:
        return jsonify({}), 400


    source_flow = Flow.query.filter_by(flow_name=name).first()
    if source_flow:
        new_name = source_flow.flow_name
        new_flow = source_flow.flow
        new_project_id = source_flow.project_id
        index = 1
        while Flow.query.filter_by(flow_name=new_name).first():
            index += 1
            new_name = f"{name}{str(index)}"

        item = Flow(
            flow_name=new_name,
            flow=new_flow,
            project_id=new_project_id,
            is_archived = 1 if int(new_project_id) == 2 else 0
        )
        db.session.add(item)
        db.session.commit()
        return jsonify({}), 200

    else:
        return jsonify({"success": False, "message": "there is a flow of that name already"})
