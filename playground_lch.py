from langchain_openai import ChatOpenAI
from langchain_core.messages.system import SystemMessage
from langchain_core.messages.human import HumanMessage
from langchain_core.messages.ai import AIMessage
from convcore import api_key

with open("playground_lch_result", "a") as p:
    api_key()
    task="""
    There is a conversation between A and B and there is a scale to rate from 1 to 3 on how much
     the last turn make sense in context of the previous turns. Your task is to produce the next turn
     which will fit in the context of the previous conversation to the degree of the given number

    The scale:
    1 - the last turn does not comply with the previous conversation
    2 - the last turn is barely relevant to previous conversation
    3 - the last turn complies well with the previous conversation

    Example of complying answer (rating 3):
    A: Jak se máš?
    B: Dobře

    Example of a noncomplying answer (rating 1):
    A: Co teď děláš?
    B: Modrá

    The previous conversation:
    """
    chat = ChatOpenAI(model="gpt-4-1106-preview", temperature=0.5)
    messages = list()
    messages.append(SystemMessage(content=task))
    messages.append(HumanMessage(content="Ahoj"))
    messages.append(AIMessage(content="Čau"))
    messages.append(HumanMessage(content="Nevíš jestli bude dneska pršet?"))
    messages.append(SystemMessage(content="The given number: 2"))
    messages.append(SystemMessage(content="""Your answer:

    Sure, an answer complying with the previous conversation to the degree of the given number could be:"""))

    result = chat.invoke(messages)
    print(result.content)
    p.write("\n")
    p.write(str(result.content))
