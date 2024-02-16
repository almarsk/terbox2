import json

from .list_items import list_items
from .add_item import add_item
from .edit_item import edit_item
from .view_item import view_item
from .remove_item import remove_item
from convproof import validate_flow

ops = {
    "list": lambda args: list_items(args),
    "add": lambda args: add_item(args),
    "remove": lambda args: remove_item(args),
    "edit": lambda args: edit_item(args),
    "view": lambda args: view_item(args),
}

def convform(instruction):
    path, flow, func, item, name, value = instruction.values()

    if func == "proof":
        return validate_flow(path, flow)

    with open(f"{path}/{flow}", "w") as fp:
        bot = json.loads(fp.read())
        return ops[func]({"bot": bot, "item": item, "name": name, "value": value})
