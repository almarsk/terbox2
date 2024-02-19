import json
import sqlite3
from datetime import datetime

def load_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

brlb = load_json("bots/brlb.json")

conn = sqlite3.connect("chatbot.db")
cursor = conn.cursor()

def insert_data(cursor, data):
    cursor.execute('''INSERT INTO Flow (flow_name, flow, project_id, created_on)
                           VALUES (?, ?, ?, ?)''', data)

# Insert JSON data into SQLite database
insert_data(cursor,("brlb", json.dumps(brlb), 1, datetime.utcnow()))


# Commit changes and close connection
conn.commit()
conn.close()