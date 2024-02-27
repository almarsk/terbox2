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

from enum import Enum

class ResponseType(Enum):
    INITIATIVE = 'Initiative'
    RESPONSIVE = 'Responsive'
    FLEXIBLE = 'Flexible'
    CONNECTIVE = 'Connective'

class State:
    name: str
    intents: dict
    annotation: str
    say: dict
    response_type: ResponseType
    prioritize: bool
    iteration: int
    initiativity: int
    context_intents: list
    context_states: list
    iterate_states: list
    def __init__(self, state):
        self.name: str = state.get("name", "")
        self.intents: dict = state.get("intents", "")
        self.annotation: str = state.get("annotation", "")
        self.say: dict = state.get("say", "")
        self.response_type: ResponseType = state.get("response_type", "")
        self.prioritize: bool = state.get("prioritize", "")
        self.iteration: int = state.get("iteration", "")
        self.initiativity: int = state.get("initiativity", "")
        self.context_intents: list = state.get("context_intents", "")
        self.context_states: list = state.get("context_states", "")
        self.iterate_states: list = state.get("iterate_states", "")
