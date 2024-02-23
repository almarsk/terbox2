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
        self.name = intent.get("name", "")
        self.annotation = intent.get("annotation", "")
        self.match_against = intent.get("match_against", "")
        self.adjacent = intent.get("adjacent", "")
        self.context_intents = intent.get("context_intents", "")
        self.context_states = intent.get("context_states", "")
        self.iterate_states = intent.get("iterate_states", "")
