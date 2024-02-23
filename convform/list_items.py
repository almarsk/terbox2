def list_items(args):

    print(args)
    flow = args.get("flow", "")
    item_type = args.get("item_type", "")

    return {
            "success": True,
            "message": f"list of {item_type}s in {flow}"
        }
