from .cstatus import ConversationStatus

def reply(userSpeech, cStatusIn):
    print(cStatusIn)
    cStatusOut = ConversationStatus(userSpeech, "vtipobot", cStatusIn)
    print(cStatusOut)
    return cStatusOut
