"""
    Conversation status {
        bot turns: int
        context intents: {str: str}
        previous last states: [str]
        possible intents: [str]
        matched intents: [str]
        intent matches: {str: int}
        adjacent states: [str]
        last states: [str]
        turns_since_initiative: int
        initiativity: int
        context states: [str]
        history: [[str]]
        state usage: {str: int}
        coda: bool
        say: str
        end: bool
    }
"""

class ConversationStatus:

    def __init__(self, userSpeech, flow, prev_cs):
        # flow isnt yet passed to all places it should be

        # number of bot turns increment
        self.bot_turns = (
            0 if prev_cs is None
            else prev_cs["bot_turns"]
        ) + 1

        # move last states of previous cso to previous last states of current cso
        self.previous_last_states = (
            None if prev_cs is None
            else prev_cs["last_states"]
        )
        # collect intents from now previous last states
        self.possible_intents = self.to_match()

        # decide which intents have been matched
        self.matched_intents = self.match_intents(userSpeech)

        # update intent matches
        self.intent_matches = self.update_intent_matches(
            None if prev_cs is None
            else prev_cs["intent_matches"]
        )
        # collect adjacent states from matched intents and add context states
        self.adjacent_states = self.get_adjacent_states(
            None if prev_cs is None
            else list(prev_cs["context_states"])
        )
        # process adjacent states to have max one initiative etc
        self.last_states = self.rhematize()

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
            None if prev_cs is None
            else prev_cs["context_intents"]
        )

        # update history
        self.history = (
            [] if prev_cs is None
            else prev_cs["history"]
        ) + self.last_states

        # update state usage
        self.state_usage = self.update_state_usage(
            None if prev_cs is None
            else prev_cs["state_usage"]
        )
        # check if coda has started
        self.coda = self.check_for_coda()

        # assemble reply including global prompting
        self.say = self.assemble_reply()

        # if there is no reply, it is the end of convo
        self.end = self.say is None

    #_______ pipeline _______

    def to_match(self):
        # TODO
        # self.previous_last_states

        # take intents of last states
        # add context intents from previous cstatus
        # either mark their adjacent states or the source last state
        # to map adjacent state later
        return {}


    def match_intents(self, userSpeech):
        # TODO
        # match using regex and prompting
        return []


    def update_intent_matches(self, previous_intent_matches):
        # TODO
        return {}


    def get_adjacent_states(self, context_states):
        # TODO
        # collect adjacent states and
        return []


    def rhematize(self):
        # TODO
        return []


    def update_turns_since_initiative(self, previous_number_of_turns):
        # TODO
        return previous_number_of_turns


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
        return "blolzp"


    #_______ conditional _______

    def initiate_conversation(self, flow):
        # TODO
        return "greetns"
