from flask import Blueprint, request, jsonify, request
import sqlite3
import os
from convproof import validate_flow

list_projects_bp = Blueprint('list_projects', __name__)

@list_projects_bp.route("/list-projects", methods=["GET"])
def list_projects():
    from app import app, db, Flow
    try:
        conn = sqlite3.connect('chatbot.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM Project")
        projects = cursor.fetchall()
        projects_data = [list(row) for row in projects]

        cursor.close()
        conn.close()
        return jsonify(projects_data)

    except Exception as e:
        print(f"db issues: {e}")
        return []
