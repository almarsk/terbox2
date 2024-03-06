"""
    Conversation status {
        context intents: {str: str}
        previous last states: [str]
        possible intents: {str: [str]}
        matched intents: {str: [str]}
        last states: [str]
        turns_since_initiative: int
        initiativity: int
        context states: [str]
        history: [[str]]
        state usage: {str: int}
        coda: bool
        raw_say: str
        say: str
        end: bool
        bot turns: int
    }
"""


from .pipeline.get_to_match import get_to_match
from .pipeline.get_matched_intents import get_matched_intents
from .pipeline.is_initiative import is_initiative
from .pipeline.get_current_initiativity import get_current_initiativity
from .pipeline.gather_context_states import gather_context_states
from .pipeline.gather_context_intents import gather_context_intents

class ConversationStatus:

    def __init__(self, user_speech, flow, prev_cs):

        # number of bot turns
        # increments at the end of __init__
        self.bot_turns = (
            0 if prev_cs is None
            else prev_cs["bot_turns"]
        ) + 1

        # move last states of previous cso to previous last states of current cso
        self.previous_last_states = (
            list() if prev_cs is None
            else prev_cs["last_states"]
        )
        # collect intents from now previous last states
        self.possible_intents = (
            {} if prev_cs is None
            else self.to_match(flow)
        )
        # decide which intents have been matched
        self.matched_intents = self.match_intents(user_speech, flow)

        # process adjacent states to have max one initiative etc
        self.last_states = self.rhematize(prev_cs is None, flow["track"])

        # mark down initiativity
        self.turns_since_initiative = self.update_turns_since_initiative(
            0 if prev_cs is None
            else prev_cs["turns_since_initiative"],
            flow)

        # update initiativity for next round
        self.initiativity = self.update_initiative(flow)

        # extract context states for next round
        self.context_states = self.get_context_states(flow)

        # update context intents based on matched intents and last states
        self.context_intents = self.update_context_intents(
            list() if prev_cs is None
            else prev_cs["context_intents"],
            flow)

        # update history
        self.history_intents = (
            [] if prev_cs is None
            else prev_cs["history_intents"]
        ) + [list(self.matched_intents.keys())]

        # update history
        self.history_states = (
            [] if prev_cs is None
            else prev_cs["history_states"]
        ) + [self.last_states]

        # update state usage
        self.state_usage = self.update_state_usage(
            dict() if prev_cs is None
            else dict(prev_cs["state_usage"]),
            self.last_states)

        # check if coda has started
        self.coda = self.check_for_coda()

        # assemble reply
        self.raw_say = self.assemble_reply()

        # replace prompt sections with llm output
        self.prompted_say = self.prompt_reply()

        # finalize answer via prompting
        self.say = self.finalize_reply()

        # if there is no reply, it is the end of convo
        self.end = self.raw_say is None or not self.raw_say

    #_______ pipeline _______

    def to_match(self, flow):
        # TEST
        return get_to_match(flow, self.previous_last_states, self.context_intents)


    def match_intents(self, user_speech, flow):
        to_match_intent_names = list(self.possible_intents.keys())
        # TODO
        if to_match_intent_names:
            matched_intents_with_index = get_matched_intents(flow, to_match_intent_names, user_speech)
            return {key: {
                "adjacent": value,
                "index": matched_intents_with_index[key]
            } for key, value in to_match_intent_names if key in list(matched_intents_with_index.keys())}
        else:
            return {}


    def rhematize(self, is_conversation_start, track):
        # TODO
        # dont forget self.context_states
        if is_conversation_start:
            return [track[0]]
        return []


    def update_turns_since_initiative(self, previous_number_of_turns, flow):
        return 0 if is_initiative(self.last_states, flow) else previous_number_of_turns + 1


    def update_initiative(self, flow):
        return get_current_initiativity(self.last_states, flow)


    def get_context_states(self, flow):
        return gather_context_states(self.last_states, flow)


    def update_context_intents(self, prev_context_intents, flow):
        return gather_context_intents(prev_context_intents, self.matched_intents.keys(), flow, self.last_states)


    def update_state_usage(self, previous_state_usage, last_states):
        # TODO
        # including incrementing iteration from within states
        for state in last_states:
            if state not in previous_state_usage:
                previous_state_usage[state] = 0

            previous_state_usage[state] += 1

        return previous_state_usage


    def check_for_coda(self):
        # TODO
        return False


    def assemble_reply(self):
        # TODO
        return "assebmled"


    def prompt_reply(self):
        # TODO
        return "prompt"


    def finalize_reply(self):
        # TODO prompting
        return "final"
