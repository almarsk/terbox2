from os import setuid
import pprint
from sys import getswitchinterval

def get_rhematized_states(flow, states, context_states, usage, coda):

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
    rhematized_states = list()
    previous_connective = ""
    initiatives = []
    for state in ordered_states:
        full_state = get_full_state(state)
        is_connective = full_state.response_type == "connective"
        if is_connective:
            pass

        is_initiative = full_state.response_type == "initiative" or full_state.response_type == "flexible"
        if is_initiative:
            initiatives.append([previous_connective, state] if previous_connective else [state])
            pass

        is_overiterated = full_state.iteration - usage.get(state, 0) < 0
        if not is_overiterated and state not in rhematized_states:
            if previous_connective:
                print(previous_connective)
                rhematized_states.append(previous_connective)
            rhematized_states.append(state)

        previous_connective = ""
    rhematized_states += (initiatives[-1] if initiatives else [])

    print("RHEMA", rhematized_states)

    if not initiatives and not coda:
        track_state = add_least_iterated_non_over_iterated(flow.track, flow, usage)
        if track_state:
            rhematized_states.append(track_state)
    print("RHEMA+INIT", rhematized_states)
    if not rhematized_states:
        print("coda time")
        coda_state = add_least_iterated_non_over_iterated(flow.coda, flow, usage)
        if coda_state:
            rhematized_states.append(coda_state)

    return rhematized_states

def add_least_iterated_non_over_iterated(states, flow, usage):
    get_full_state = lambda searched_state: [
        state
        for state in flow.states
        if state.name == searched_state
        ][0]

    candidate = sorted(
        [state for state in states if get_full_state(state).iteration - usage.get(state, 0) > 0],
        key=lambda state: get_full_state(state).iteration - usage.get(state, 0)
    )

    return candidate[0] if candidate else None
