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
    def __init__(self, path, flow_name):
        flow = validate_flow(path, flow_name, return_flow=True)
        self.persona = flow["persona"]
        self.track = flow["track"]
        self.coda = flow["coda"]
        self.states = [State(state) for state in flow["states"]]
        self.intents = [Intent(intent) for intent in flow["intents"]]
