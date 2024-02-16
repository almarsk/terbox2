def view_item(args):
    bot, item_type, name = args.values()
    # check if item is present, return no, if not present

    return {
         "success": True,
         "message": f"view {item_type} {name} in {bot}"
     }
