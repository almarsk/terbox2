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
import random

from .pipeline.get_to_match import get_to_match
from .pipeline.get_matched_intents import get_matched_intents
from .pipeline.is_initiative import is_initiative
from .pipeline.get_current_initiativity import get_current_initiativity
from .pipeline.gather_context_states import gather_context_states
from .pipeline.gather_context_intents import gather_context_intents
from .pipeline.get_rhematized_states import get_rhematized_states
from ..prompting.resolve_prompt import resolve_prompt

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
            else self.to_match(flow, prev_cs["context_intents"])
        )
        # decide which intents have been matched
        self.matched_intents = self.match_intents(user_speech, flow)

        # process adjacent states to have max one initiative etc
        self.last_states = self.rhematize(prev_cs is None, flow, prev_cs["context_states"])

        # mark down initiativity
        self.turns_since_initiative = self.update_turns_since_initiative(
            0 if prev_cs is None
            else prev_cs["turns_since_initiative"],
            flow)

        # update initiativity for next round
        self.initiativity = self.update_initiative(flow)

        # update context intents based on matched intents and last states
        self.context_intents = self.update_context_intents(
            list() if prev_cs is None
            else prev_cs["context_intents"],
            flow)

        # extract context states for next round
        self.context_states = self.get_context_states(flow)

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
        self.coda = self.check_for_coda(flow)

        # assemble reply
        self.raw_say = self.assemble_reply(flow)

        # replace prompt sections with llm output
        self.prompted_say = self.prompt_reply()

        # finalize answer via prompting
        self.say = self.finalize_reply()

        # if there is no reply, it is the end of convo
        self.end = self.raw_say is None or not self.raw_say

        self.turns_history = prev_cs["turns_history"] + [user_speech] + [self.say]

    #_______ pipeline _______

    def to_match(self, flow, prev_context_intents):
        return get_to_match(flow, self.previous_last_states, prev_context_intents)


    def match_intents(self, user_speech, flow):
        to_match_intent_names = dict(self.possible_intents)
        print("TODO prompt intent reco")

        if to_match_intent_names:
            matched_intents_with_index = get_matched_intents(flow, to_match_intent_names.keys(), user_speech)
            return {key: {
                "adjacent": value,
                "index": matched_intents_with_index[key]
            } for key, value in to_match_intent_names.items() if key in list(matched_intents_with_index.keys())}
        else:
            return {}


    def rhematize(self, is_conversation_start, flow, context_states):
        if is_conversation_start:
            return [flow.track[0]]
        return get_rhematized_states(flow, self.matched_intents, context_states)


    def update_turns_since_initiative(self, previous_number_of_turns, flow):
        return 0 if is_initiative(self.last_states, flow) else previous_number_of_turns + 1


    def update_initiative(self, flow):
        return get_current_initiativity(self.last_states, flow)


    def get_context_states(self, flow):
        return gather_context_states(self.last_states, flow)


    def update_context_intents(self, prev_context_intents, flow):
        return gather_context_intents(prev_context_intents, self.matched_intents.keys(), flow, self.last_states)


    def update_state_usage(self, previous_state_usage, last_states):
        # including incrementing iteration from within states
        for state in last_states:
            if state not in previous_state_usage:
                previous_state_usage[state] = 0
            previous_state_usage[state] += 1
        return previous_state_usage


    def check_for_coda(self, flow):
        coda = flow.coda
        return bool([state for state in self.last_states if state in coda])


    def assemble_reply(self, flow):
        return [
            state.say[random.randint(0, len(state.say) - 1)]
            for state in flow.states
            if state.name in self.last_states
        ]


    def prompt_reply(self):
        return " ".join([
            resolve_prompt(say["text"])
            if say["prompt"]
            else say["text"]
            for say in self.raw_say])


    def finalize_reply(self):
        print("TODO global prompting")
        return self.prompted_say
