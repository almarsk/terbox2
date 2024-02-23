import sqlite3
import json

def edit_item(args):
    from app import Flow, db

    flow = args.get("flow", "")
    item_type = args.get("item_type", "")
    name = args.get("name", "")
    data = args.get("data", "")

    print("\n\n\n\ndata", data)

    conn = sqlite3.connect("chatbot.db")
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM flow WHERE flow_name = ?", (flow,))

    existing_record = cursor.fetchone()

    print("\n\n\ndb time\n\n\n")

    if existing_record :
        flow_data = json.loads(existing_record[3])

        items_list = None
        processed_data = dict()
        if item_type == "intent":
            items_list = flow_data.get("intents", [])
        elif item_type == "state":

            processed_data = modify_data_state(data)

            items_list = flow_data.get("states", [])
        if items_list is None:
            return {
                "success": False,
                "message": f"Invalid item type {item_type}"
            }

        updated = False
        for item in items_list:
            if item.get("name", "") == name:
                item.update(data)
                updated = True
        if not updated:
            items_list.append(data)

        if item_type == "intent":
            flow_data["intents"] = items_list
        elif item_type == "state":
            flow_data["states"] = items_list

        cursor.execute('''UPDATE flow SET flow = ? WHERE flow_name = ?''',
            (json.dumps(flow_data), flow))

        conn.commit()
        conn.close()


        return {
            "success": True,
            "message": f"{item_type} {name} edited in {flow}"
        }

    else:
        return {
            "success": False,
            "message": f"Can't edit nonexistent flow {flow}"
        }


def modify_data_state(data):
    #data["intents"] = {i[0]: i[1:] for i in data["intents"].split("|")} if "|" in data["intents"] else {}

    intents = dict()
    for intent in data["intents"].split("|"):
        intent_adjacent = [i for i in intent.strip().split(" ") if i.strip()]
        if len(intent_adjacent):
            intents[intent_adjacent[0]] = [i.strip() for i in intent_adjacent[1:]]

    data["intents"] = intents



    data["say"] = data["say"].split("|")

    try:
        data["iteration"] = int(data["iteration"])
    except ValueError:
        data["iteration"] = ""

    data["prioritize"] = data["prioritize"]

    try:
        data["initiativity"] = int(data["iteration"])
    except ValueError:
        data["initiativity"] = ""

    data["context_intents"] = data["context_intents"].split("|")
    data["context_states"] = data["context_states"].split("|")
    data["iterate_states"] = data["iterate_states"].split("|")

    return data
