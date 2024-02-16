def list_items(args):
    bot, item_type = args.values()

    return {
            "success": True,
            "message": f"list of {item_type}s in {bot}"
        }
