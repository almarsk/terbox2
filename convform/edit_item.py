def edit_item(args):
    bot, data, item_type = args.values()
    # check if item is present, return no, if not present

    return {
            "success": True,
            "message": f"{item_type} added with {data} in {bot}"
        }
