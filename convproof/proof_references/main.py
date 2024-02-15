"""
valid references
    flow
        the track
        coda
    state
        intent
            name
            adjecent
        context
            add state
            interate state
            add intent
    intent
        adjacent
        context
            add state
            interate state
            add intent
"""

to_check = {
    "flow": {"track": "states", "coda": "states"},
    "states": {
        "context_intents": "intents",
        "context_states": "states",
        "iterate_states": "states",
        "intents": {
            "name": "intents",
            "adjacent": "states"
        }
    },
    "intents": {
        "adjacent": "states",
        "context_intents": "intents",
        "context_states": "states",
        "iterate_states": "states",
    }
}

def proof_references(bot, issues):
    issues.append("brah")
    intent_names = [intent["name"] for intent in bot["intents"]]
    state_names = [state["name"] for state in bot["states"]]

    destinations_states = list()
    destinations_intents = list()
    for key, value in to_check.items():
        collect_destinations(key, value, "states", destinations_states)
        collect_destinations(key, value, "intents", destinations_intents)

    for destination in destinations_states:
        check_items = collect_check_items(destination, "states", bot)
        [issues.append(f"missing {missing} in {destination}") for missing in filter(lambda i: i not in state_names, check_items)]

    issues.append(f"Destinations to check for intents: {destinations_intents}")


def collect_destinations(key, value, target_key, destinations):
    if isinstance(value, dict):
        for k,v in value.items():
            collect_destinations(sediment_key(key) + [k] ,v, target_key, destinations)
    elif isinstance(value, str):
        if value is target_key:
            destinations.append(key)

def sediment_key(key):
    if isinstance(key, str):
        return [key]
    else:
        return [*key]

def collect_check_items(destination, check_against, bot):
    where = bot
    went_through_list = False
    resulting_items = list()
    for i, checkpoint in enumerate(destination):
        print(f"where in iteration {i+1}: {where}\n with checkpoint {checkpoint}\n")
        if checkpoint == "flow":
            pass
        elif isinstance(where, list):
            went_through_list = True
            pass
        elif went_through_list:
            for current_items in where[checkpoint]:
                resulting_items = resulting_items + current_items
        else:
            where = where[checkpoint]

    return resulting_items if went_through_list else where
