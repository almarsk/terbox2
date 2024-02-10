def reply(userSpeech, cStatusIn):
    cStatusOut = dict(cStatusIn)
    cStatusOut["bot-turns"] += 1

    if "end" in userSpeech:
        cStatusOut["end"] = True
    if not cStatusIn or cStatusIn["bot-turns"] == 0:
        cStatusOut = {"end": False, "say": "ahojkons", "bot-turns": 1}
    else:
        cStatusOut["say"] = userSpeech.upper()

    return cStatusOut
