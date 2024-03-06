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
        self.possible_intents = self.to_match(flow)

        # decide which intents have been matched
        self.matched_intents = self.match_intents(user_speech, flow)

        # process adjacent states to have max one initiative etc
        self.last_states = self.rhematize(prev_cs is None, flow["track"])

        # mark down initiativity
        self.turns_since_initiative = self.update_turns_since_initiative(
            None if prev_cs is None else
            prev_cs["turns_since_initiative"]
        )
        # update initiativity for next round
        self.initiativity = self.update_initiative()

        # extract context states for next round
        self.context_states = self.get_context_states()

        # update context intents based on matched intents and last states
        self.context_intents = self.update_context_intents(
            list() if prev_cs is None
            else prev_cs["context_intents"]
        )

        # update history
        self.history = (
            [] if prev_cs is None
            else prev_cs["history"]
        ) + self.last_states

        # update state usage
        self.state_usage = self.update_state_usage(
            dict() if prev_cs is None
            else prev_cs["state_usage"]
        )
        # check if coda has started
        self.coda = self.check_for_coda()

        # assemble reply
        self.raw_say = self.assemble_reply()

        # replace prompt sections with llm output
        self.prompted_say = self.prompt_reply()

        # finalize answer via prompting
        self.say = self.finalize_reply()

        # if there is no reply, it is the end of convo
        self.end = self.raw_say is None

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
        if is_conversation_start:
            return [track[0]]

        return []


    def update_turns_since_initiative(self, previous_number_of_turns):
        # TODO
        return 0 if is_initiative() else previous_number_of_turns + 1


    def update_initiative(self):
        # TODO
        return 1


    def get_context_states(self):
        # TODO
        return []


    def update_context_intents(self, prev_context_intents):
        # TODO
        print("todo update context intents")


    def update_state_usage(self, previous_state_usage=None):
        # TODO
        # including incrementing iteration from within states
        if previous_state_usage is None:
            print("start a new state usage dict")
        return {}


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
