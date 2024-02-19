from flask import Blueprint, session, request, jsonify
from database import db
from datetime import datetime

move_bp = Blueprint('move', __name__)

@move_bp.route("/move", methods=["POST"])
def move():
    print("moving time")
    from app import Flow, Project, db
    item_type, name, archived, destination = request.get_json().values()
    print(item_type, name, archived, destination)

    if item_type == "project":
        project = Project.query.filter_by(project_name=name).first()
        if project.id == 1 or project.id == 2:
            return {"success": False, "message": "workspace and archived are never archived"}
        project.is_archived = int(archived)
        db.session.add(project)
        db.session.commit()



    return jsonify({"success": True, "message": f"{name} moved"})
