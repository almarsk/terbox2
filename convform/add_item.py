def add_item(args):
    bot, data, item_type = args.values()
    # check if item is not present, return no, if present

    return {
        "success": True,
        "message": f"{item_type} added with {data} in {bot}"
    }
