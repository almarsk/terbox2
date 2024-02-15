"""
    intent
        name: str,
        annotation: str
        match against: [str] || str
        adjacent: [str]
        context intents: [str]
        context states: [str]
        iterate states: [str]
"""

class Intent:
    def __init__(self, intent):
        self.name = intent["name"]
        self.annotation = intent["annotation"]
        self.match_against = intent["match_against"]
        self.adjacent = intent["adjacent"]
        self.context_intents = intent["context_intents"]
        self.context_states = intent["context_states"]
        self.iterate_states = intent["iterate_states"]
