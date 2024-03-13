from os import setuid
import pprint
from sys import getswitchinterval

def get_rhematized_states(flow, states, context_states, usage):

    # order adjacents by index
    ordered_states = {
        state
        for [index, states]
        in sorted([
            [state["index"], state["adjacent"]]
            for _, state
            in states.items()
        ], key=lambda x: x[0])
        for state in states
    }

    ordered_states |= set(context_states)

    get_full_state = lambda searched_state: [
        state
        for state in flow.states
        if state.name == searched_state
        ][0]

    # filter out overiterated states including connectives
    filtered_states = list()
    previous_connective = ""
    initiatives = []
    for state in ordered_states:
        full_state = get_full_state(state)
        is_connective = full_state.response_type == "connective"
        if is_connective:
            pass

        is_initiative = full_state.response_type == "initiative"
        if is_initiative:
            initiatives.append([previous_connective, state] if previous_connective else [state])
            pass

        is_overiterated = full_state.iteration - usage.get(state, 0) < 0
        if not is_overiterated and state not in filtered_states:
            if previous_connective:
                print(previous_connective)
                filtered_states.append(previous_connective)
            filtered_states.append(state)

        previous_connective = ""
    filtered_states += (initiatives[-1] if initiatives else [])

    is_initiative =  bool([state
        for state in filtered_states
        if get_full_state(state).response_type == "initiative"
        or get_full_state(state).response_type == "flexible"
    ])

    if not is_initiative:
        filtered_states.append(sorted(
            flow.track,
            key=lambda state: get_full_state(state).iteration - usage.get(state, 0)
        )[0])

    return filtered_states
