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
    "flow": {
        "track": "states",
        "coda": "states"
    },
    "states": {
        "context_intents": "intents",
        "context_states": "states",
        "iterate_states": "states",

        # taking care of this separately
        #
        #"intents": {
        #    "intents": "states",
        #}

    },
    "intents": {
        "adjacent": "states",
        "context_intents": "intents",
        "context_states": "states",
        "iterate_states": "states",
    }
}


def proof_references(bot, issues):
    intent_names = [intent["name"] for intent in bot["intents"]]
    state_names = [state["name"] for state in bot["states"]]

    destinations_states = set()
    destinations_intents = set()
    for key, value in to_check.items():
        collect_destinations(key, value, "states", destinations_states)
        collect_destinations(key, value, "intents", destinations_intents)

    for destination in destinations_intents:
        check_intents = collect_check_items(destination, "intents", bot)
        [issues.append(f"missing intent {missing} from {', '.join(destination)}") for missing in filter(lambda i: i not in intent_names, check_intents)]

    issues.extend(f"missing intent {intent} from state {state['name']}" for state in bot["states"] for intent in state["intents"].keys() if intent not in intent_names)

    for destination in destinations_states:
        check_states = collect_check_items(destination, "states", bot)
        [issues.append(f"missing state {missing} from {', '.join(destination)}") for missing in filter(lambda i: i not in state_names, check_states)]

    issues.extend(f"missing state {', '.join(adjacent)} from state {state['name']} and its intent {intent}" for state in bot["states"] for intent,adjacent in state["intents"].items() if adjacent not in state_names)


def collect_destinations(key, value, target_key, destinations):
    if isinstance(value, dict):
        for k,v in value.items():
            collect_destinations(sediment(key) + [k] ,v, target_key, destinations)
    elif isinstance(value, str):
        if value is target_key:
            destinations.add(tuple(key))


def sediment(key):
    if isinstance(key, str):
        return [key]
    else:
        return [*key]


def collect_check_items(destination, check_against, bot):
    where = bot
    resulting_items = list()
    for i, checkpoint in enumerate(destination):
        if checkpoint == "flow":
            pass
        elif isinstance(where, list):
            for current_item in where:
                for inner_checkpoint in destination[i:]:
                    where = current_item[inner_checkpoint]
                resulting_items = resulting_items + sediment(where)
                resulting_items = [f"{i} of {check_against[:-1]} {current_item['name']}" for i in resulting_items]
            print(resulting_items)
            return resulting_items
        else:
            where = where[checkpoint]

    return where
