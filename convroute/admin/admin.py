from flask import Blueprint, request, jsonify, render_template

admin_bp = Blueprint('admin', __name__)

@admin_bp.route("/admin", methods=("GET", "POST"))
def admin():
    return render_template("index.html", admin="true")
