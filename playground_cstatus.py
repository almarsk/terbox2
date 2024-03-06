from convproof import validate_flow
from convcore.cstatus.cstatus import ConversationStatus

from app import app

with app.app_context():

    flow_name = "test"
    flow = validate_flow(flow_name, return_flow=True)

    user_speech = "twl lol haha"

    print(str(ConversationStatus(flow, ["yeah", "čau"], user_speech)))
