"""
state
    name: str
    intents {name: [str]}
    annotation: str
    say: [str] || prompt
    type: Type
    iteration: int
    prioritize: bool
    initiativity: int || None
    context intents: [str]
    context states: [str]
    iterate states: [str]
"""

class State:
    def __init__(self, state):
        self.name = state.get("name", "")
        self.intents = state.get("intents", "")
        self.annotation = state.get("annotation", "")
        self.say = state.get("say", "")
        self.response_type = state.get("response_type", "")
        self.iteration = state.get("iteration", "")
        self.prioritize = state.get("prioritize", "")
        self.initiativity = state.get("initiativity", "")
        self.context_intents = state.get("context_intents", "")
        self.context_states = state.get("context_states", "")
        self.iterate_states = state.get("iterate_states", "")
