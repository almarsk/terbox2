def remove_item(args):
    flow = args.get("flow", "")
    item_type = args.get("item_type", "")
    name = args.get("name", "")

    return {
            "success": True,
            "message": f"remove {flow} of type {item_type}"
        }
