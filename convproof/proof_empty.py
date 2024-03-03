import pprint

def proof_empty(bot, issues):
    try:
        for key, value in bot.items():
            if not value:
                issues.append(f"{key} empty")

        for state in bot["states"]:
            if not state["say"]:
                issues.append(f"say in state {state['name']} empty")

            for intent, adjacent in state["intents"].items():
                if adjacent or default_adjacent(intent, bot):
                    pass
                else:
                    issues.append(f"intent {intent} in state {state['name']} empty")

        for intent in bot["intents"]:
            if not intent["match_against"]:
                issues.append(f"match_against in state {intent['name']} empty")

    except Exception as e:
        issues.append(e)

def default_adjacent(intent, bot):
    try:
        is_adjacent = bool([i for i in bot["intents"] if i["name"] == intent][0]["adjacent"])
        return is_adjacent
    except:
        return False
