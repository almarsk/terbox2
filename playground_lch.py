from langchain_openai import ChatOpenAI
from langchain_core.messages.system import SystemMessage
from langchain_core.messages.human import HumanMessage
from langchain_core.messages.ai import AIMessage
from convcore import api_key

with open("playground_lch_result", "a") as p:
    api_key()
    task="""
    Tady jsou možnosti:

    a) prozradil co dělá
    b) zeptal se jak se má
    c) postěžoval si na počasí
    d) pochválil počasí
    d) nic z nabídnutých možností

    Které z uvedených variant nejlépe odpovídá poslední replika v následující konverzaci?
    """
    chat = ChatOpenAI(model="gpt-4-1106-preview", temperature=0.5)
    messages = list()
    messages.append(SystemMessage(content=task))
    messages.append(HumanMessage(content="Ahoj jak se máš?"))
    messages.append(AIMessage(content="čau jo dobře, mám se fajn. co teď děláš?"))
    messages.append(HumanMessage(content="dneska je ošklivo"))
    messages.append(SystemMessage(content="""Tvá odpověď:

    Jasně! z nabídnutých variant volil mluvčí variantu"""))

    result = chat.invoke(messages)
    print(result.content)
    p.write("\n")
    p.write(str(result.content))
