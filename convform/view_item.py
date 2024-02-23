def view_item(args):
    flow = args.get("flow", "")
    item_type = args.get("item_type", "")
    name = args.get("name", "")

    return {
            "success": True,
            "message": f"view {item_type} {name} from {flow}"
        }
