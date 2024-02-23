"""
    Flow {
        persona: str
        the track: [str]
        coda: [str]
        states: {str: State}
        intents: {str: Intent}
    }
"""

import json
import os
from convproof import validate_flow
from .state import State
from .intent import Intent

class Flow:
    def __init__(self, path, flow_name, structure=False):
        # to display
        if structure:
            flow = {}
        else:
            flow = validate_flow(path, flow_name, return_flow=True)

        self.persona = flow.get("persona", "")
        self.track = flow.get("track", "")
        self.coda = flow.get("coda", "")
        self.states = [State(state) for state in flow.get("states", [])]
        self.intents = [Intent(intent) for intent in flow.get("intents", [])]
