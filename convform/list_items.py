import sqlite3
import json

def list_items(args):

    flow = args.get("flow", "")
    item_type = args.get("item_type", "")

    conn = sqlite3.connect("chatbot.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM flow WHERE flow_name = ?", (flow,))

    existing_record = cursor.fetchone()

    if not existing_record:
        return {
                "success": False,
                "message": f"flow {flow} doesnt exist"
            }


    conn.commit()
    conn.close()

    full_data = json.loads(existing_record[3])
    return_data = full_data[f"{item_type}s"] if item_type != "meta" else full_data

    print("\n\n\nreturn\n", return_data, "\n\n\n")

    return {
        "success": True,
        "data": return_data
        }
