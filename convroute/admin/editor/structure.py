from convcore import Flow, State, Intent
from flask import Blueprint, jsonify

structure_bp = Blueprint('structure', __name__)

@structure_bp.route('/structure', methods=['POST'])
def get_structure():
    state_keys = list(State({}).__dict__.keys())
    intent_keys = list(Intent({}).__dict__.keys())
    flow_keys = [key for key in filter(lambda k: k != "states" and k != "intents", Flow("", "", structure=True).__dict__.keys())]

    print(state_keys, intent_keys, flow_keys)

    return jsonify({
        "states": state_keys,
        "intents": intent_keys,
        "flow": flow_keys
    })
