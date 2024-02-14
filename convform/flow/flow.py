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
print(os.getcwd())
from convval import validate_flow

class Flow:
    def __init__(self, path, flow_name):

        flow = validate_flow(path, flow_name, return_flow=True)
        print(type(flow))
        self.persona = flow["persona"]
        self.track = flow["track"]
        self.coda = flow["coda"]
        self.states = flow["states"]
        self.intents = flow["intents"]



flow = Flow("bots", "vtipobot")
