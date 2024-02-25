from flask import Blueprint, session, request, jsonify
from database import db
from datetime import datetime

move_bp = Blueprint('move', __name__)

@move_bp.route("/move", methods=["POST"])
def move():
    from app import Flow, Project, db
    item_type, name, destination = request.get_json().values()


    if item_type == "project":
        project = Project.query.filter_by(project_name=name).first()
        if project.id in [1,2,3] :
            return {"success": False, "message": "workspace, archived and all cant be moved"}
        # archived projects are found in project id 2
        project.is_archived = 1 if int(destination) == 2 else 0
        db.session.add(project)
        db.session.commit()

    elif item_type == "flow":
        flow = Flow.query.filter_by(flow_name=name).first()
        if destination is not None and not destination in [3]:
            flow.project_id = destination

        flow.is_archived = 1 if int(destination) == 2 else 0
        db.session.add(flow)
        db.session.commit()


    return jsonify({"success": True, "message": f"{name} moved"})
