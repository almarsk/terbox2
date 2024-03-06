from convproof import validate_flow
from convcore.cstatus.cstatus import ConversationStatus
import pprint

from app import app

with app.app_context():

    cs = {'bot_turns': 1,
     'previous_last_states': [],
     'possible_intents': {},
     'matched_intents': {},
     'last_states': ['yeah'],
     'turns_since_initiative': 1,
     'initiativity': 14,
     'context_intents': ['yeah'],
     'context_states': ['bruhio'],
     'history_intents': [[]],
     'history_states': [['yeah']],
     'state_usage': {'yeah': 1},
     'coda': False,
     'raw_say': [{'text': 'broh', 'prompt': True}],
     'prompted_say': 'prompt',
     'say': 'final',
     'end': False}

    flow_name = "test"
    flow = validate_flow(flow_name, return_flow=True)

    user_speech = "twl lol haha"

    pprint.pp(ConversationStatus(user_speech, flow, cs).__dict__)
