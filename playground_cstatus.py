from convproof import validate_flow
from convcore.cstatus.cstatus import ConversationStatus
from convcore import Flow
import pprint

from app import app

with app.app_context():

    cs = {
      "bot_turns": 0,
      "previous_last_states": [],
      "possible_intents": {},
      "matched_intents": {},
      "last_states": [],
      "turns_since_initiative": 0,
      "initiativity": 1,
      "context_intents": [],
      "context_states": [],
      "history_intents": [[]],
      "history_states": [],
      "state_usage": {

      },
      "coda": False,
      "raw_say": [

      ],
      "prompted_say": "",
      "say": "",
      "end": False,
      "turns_history": []
    }

    flow_name = "test"
    flow = Flow(flow_name)

    user_speech = ""
    c = ConversationStatus(user_speech, flow, cs).__dict__

    pprint.pp(c)
