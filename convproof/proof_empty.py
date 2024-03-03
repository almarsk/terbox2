import pprint

def proof_empty(bot, issues):
    try:
        for key, value in bot.items():
            if not value:
                issues.append(f"{key} empty")

        for state in bot["states"]:
            for key, value in state.items():
                if not value:
                    issues.append(f"{key} in state {state['name']} empty")

            for intent, adjacent in state["intents"].items():
                if not adjacent:
                    issues.append(f"intent {intent} in state {state['name']} empty")

        for intent in bot["intents"]:
            for key, value in intent.items():
                if not value:
                    issues.append(f"{key} in state {intent['name']} empty")

    except Exception as e:
        issues.append(e)
