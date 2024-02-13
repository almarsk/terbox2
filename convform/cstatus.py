"""
    CSO {
        bot turns: int
        context intents: [str]
        previous last states: [str]
        possible intents: [str]
        matched intents: [str]
        adjacent states: [str]
        turns_since_initiative: int
        last states: [str]
        context states: [str]
        history: [[str]]
        initiativity: int
        coda: bool
        reply: str
    }
"""

class ConversationStatus:
    def __init__(self, userSpeech, flow, previous_conversation_status=None):
        # flow isnt yet passed to all places it should be

        if previous_conversation_status is not None:
            # number of bot turns increment
            self.bot_turns = previous_conversation_status.bot_turns + 1
            # move last states of previous cso to previous last states of current cso
            self.previous_last_intents = previous_conversation_status.last_states
            # collect intents from now previous last states
            self.possible_intents = self.intents_of_last_states()
            # decide which intents have been matched
            self.matched_intents = self.match_intents(userSpeech)
            # update intent matches
            self.intent_matches = self.update_intent_matches(previous_conversation_status.intent_matches)
            # collect adjacent states from matched intents and add context states
            self.adjacent_states = self.get_adjacent_states(list(previous_conversation_status.context_states))
            # process adjacent states to have max one initiative etc
            self.last_states = self.rhematize()
            # mark down initiativity
            self.turns_since_initiative = self.update_turns_since_initiative(previous_conversation_status.turns_since_initiative)
            # update initiativity for next round
            self.initiativity = self.update_initiative()
            # extract context states for next round
            self.context_states = self.get_context_states()
            # update history
            self.history = previous_conversation_status.history + self.last_states
            # update state usage
            self.state_usage = self.update_state_usage(previous_conversation_status.state_usage)
            # check if coda has started
            self.coda = self.check_for_coda()
            # assemble reply including global prompting
            self.reply = self.assemble_reply()
            # if there is no reply, it is the end of convo
            self.end = self.reply is None
        else:
            self.bot_turns = 1
            self.previous_last_intents = None
            self.possible_intents = None
            self.matched_intents = None
            self.intent_matches = None
            self.adjacent_states = None
            self.last_states = self.initiate_conversation(flow)
            self.turns_since_initiative = 0
            self.initiativity = self.update_initiative()
            self.context_states = self.get_context_states()
            self.history = [self.last_states]
            self.state_usage = self.update_state_usage()
            self.coda = self.check_for_coda()
            self.reply = self.assemble_reply()
            self.end = self.reply is None



    def intents_of_last_states(self):
        # self.previous_last_states

        # take intents of last states
        # either mark their adjacent states or the source last state
        # to map adjacent state later
        return {}

    def match_intents(self, userSpeech):
        # match using regex and prompting
        return []

    def get_adjacent_states(self, context_states):
        # collect adjacent states and
        return []

    def rhematize(self):
        return []

    def get_context_states(self):
        return []

    def check_for_coda(self):
        return False

    def assemble_reply(self):
        return ""

    def update_initiative(self):
        return 1

    def update_turns_since_initiative(self, previous_number_of_turns):
        return previous_number_of_turns

    def update_state_usage(self, previous_state_usage=None):
        if previous_state_usage is None:
            print("start a new state usage dict")
        return {}

    def update_intent_matches(self, previous_intent_matches):
        return {}

    def initiate_conversation(self, flow):
        return ""
