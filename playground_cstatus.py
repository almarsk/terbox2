from convproof import validate_flow
from convcore.cstatus.cstatus import ConversationStatus
from convcore import Flow
import pprint

from app import app

with app.app_context():

    cs = {
      "bot_turns": 1,
      "previous_last_states": [],
      "possible_intents": {},
      "matched_intents": {},
      "last_states": ["yeah"],
      "turns_since_initiative": 0,
      "initiativity": 14,
      "context_intents": ["yeah"],
      "context_states": ["bruhio"],
      "history_intents": [[]],
      "history_states": [["yeah"]],
      "state_usage": {
        "yeah": 1
      },
      "coda": False,
      "raw_say": [
        {
          "prompt": True,
          "text": "broh"
        }
      ],
      "prompted_say": "BROH",
      "say": "BROH",
      "end": False,
      "turns": []
    }

    flow_name = "test"
    flow = Flow(flow_name)

    user_speech = "twl lol haha okidouk"

    pprint.pp(ConversationStatus(user_speech, flow, cs).__dict__)
