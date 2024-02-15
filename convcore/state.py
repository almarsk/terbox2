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
        self.name = state["name"]
        self.intents = state["intents"]
        self.annotation = state["annotation"]
        self.say = state["say"]
        self.response_type = state["response_type"]
        self.iteration = state["iteration"]
        self.prioritize = state["prioritize"]
        self.initiativity = state["initiativity"]
        self.context_intents = state["context_intents"]
        self.context_states = state["context_states"]
        self.iterate_states = state["iterate_states"]
