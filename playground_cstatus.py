from convproof import validate_flow
from convcore.cstatus.cstatus import ConversationStatus
import pprint

from app import app

with app.app_context():

    flow_name = "test"
    flow = validate_flow(flow_name, return_flow=True)

    user_speech = "twl lol haha"

    pprint.pp(ConversationStatus(user_speech, flow, None).__dict__)
