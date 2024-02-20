import json
import sqlite3
from datetime import datetime

def load_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return json.dumps(data)

brlb = load_json("bots/brlb.json")

conn = sqlite3.connect("chatbot.db")
cursor = conn.cursor()

def insert_data(cursor, data):
    cursor.execute('''INSERT INTO Flow (flow_name, project_id, flow, is_archived, created_on)
                           VALUES (?, ?, ?, ?, ?)''',
                           data)



cursor.execute('''DELETE FROM Flow WHERE flow_name IN ('lol', 'brlb', 'brah');''')
# Insert JSON data into SQLite database
insert_data(cursor,("brlb", 1, load_json("bots/brlb.json"), 0, datetime.utcnow()))






# Commit changes and close connection
conn.commit()
conn.close()
