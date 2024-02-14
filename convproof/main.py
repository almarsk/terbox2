import os
import json

from .structure_validation import flow_structure, intents_structure, states_structure
from .references_validation import flow_references, intents_references, states_references

def validate_flow(path, flow, return_flow=False):
    issues = list()
    bot = dict()
    full_path = f"./{path}/{flow.lower()}.json"
    if not os.path.exists(full_path):
        issues.append("invalid path")
    else:
        with open(full_path, "r") as b:
            bot = json.loads(b.read())

            flow_structure(bot, issues)
            flow_references(bot, issues)
            intents_structure(bot, issues)
            intents_references(bot, issues)
            states_structure(bot, issues)
            states_references(bot, issues)

    if return_flow:
        return bot if not issues else issues
    else:
        return not issues
