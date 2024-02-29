from convcore import Flow, State, Intent
from flask import Blueprint, jsonify
import re
import pprint

structure_bp = Blueprint('structure', __name__)

@structure_bp.route('/structure', methods=['POST'])
def get_structure():

    state_anno = {key: get_quoted_value_or_full_string(value) for key, value in State.__annotations__.items()}
    intent_anno = { key: get_quoted_value_or_full_string(value) for key, value in Intent.__annotations__.items()}
    flow_anno = {key: get_quoted_value_or_full_string(value) for key, value in Flow.__annotations__.items() if key != "states" and key != "intents"}

    states_ordered = [[key, state_anno[key]] for key in list(State({}).__dict__.keys()) if key in state_anno]
    intent_ordered = [[key, intent_anno[key]] for key in list(Intent({}).__dict__.keys()) if key in intent_anno]
    flow_ordered = [[key, flow_anno[key]] for key in list(Flow("","", structure=True).__dict__.keys()) if key in flow_anno]

    return jsonify({
        "states": states_ordered,
        "intents": intent_ordered,
        "flow": flow_ordered
    })


def get_quoted_value_or_full_string(value):
    match = re.search(r"'([^']*)'", str(value))
    if match:
        return match.group(1)
    else:
        return str(value)
