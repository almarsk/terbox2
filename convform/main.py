from .cstatus import ConversationStatus

def reply(userSpeech, flow, c_status_in):
    cStatusOut = ConversationStatus(userSpeech, flow, c_status_in)
    return cStatusOut
