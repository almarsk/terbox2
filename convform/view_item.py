def view_item(args):
    from app import Flow
    flow = args.get("flow", "")
    item_type = args.get("item_type", "")
    name = args.get("name", "")

    flow_data = Flow.query.filter_by(flow_name=flow).first()

    if flow_data is None:
        return {
            "success": False,
            "message": f"cant view {item_type} from nonexistent flow {flow}"
        }



    items_list = list()
    if item_type == "state":
        items_list = flow_data.flow["states"]
    elif item_type == "intent":
        items_list = flow_data.flow["intents"]

    print("items", items_list)
    item = next((d for d in items_list if d.get('name') == name), {})

    return {
            "success": True,
            "data": item
        }
