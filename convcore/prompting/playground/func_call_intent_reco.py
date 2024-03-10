from langchain_openai import ChatOpenAI
from langchain_core.messages.system import SystemMessage
from langchain_core.messages.human import HumanMessage
from langchain_core.messages.ai import AIMessage
from convcore import api_key

import json

def intent_reco():
    api_key()
    task="""
    Tady jsou možnosti:

    a) prozradil co dělá
    b) zeptal se jak se má
    c) postěžoval si na počasí
    d) pochválil počasí
    e) nic z nabídnutých možností

    Tvůj úkol:
    Seřaď možnosti podle toho, jak dobře popisují poslední repliku v konverzaci.
    Možnosti, které nezapadají nezahrnuj.
    Odpověď pouze písmenem.

    Přechozí konverzace:
    """
    chat = ChatOpenAI(model="gpt-4-1106-preview", temperature=0.5)
    messages = [
        HumanMessage(content="Ahoj jak se máš?"),
        AIMessage(content="čau jo dobře, mám se fajn. co teď děláš?"),
        SystemMessage(content="\nAktuální replika:"),
        HumanMessage(content="dneska je ošklivo"),
    ]

    functions=[{
        'name': 'choose_variants',
        'description': 'Zaznamenává pořadí daných popisů poslední repliky od nejvhodnějšího po nejméně vhodný. Ty úplně nevhodné vynechává.',
        'parameters': {
            'type': 'object',
            'properties': {
                "variants": {
                    "type": "string",
                    "description": "Seřaď vhodné popisy",
                    "items": {
                        "type": "string"
                    }
                }


            },
        'required': ['variants']
    }}]

    result = chat.invoke(messages, functions=functions).additional_kwargs

    decoded_arguments = json.loads(bytes(result["function_call"]["arguments"], "utf-8").decode("unicode_escape"))

    with open("convcore/prompting/playground/playground_lch_result", "a") as p:
        p.write("\n")
        p.write(str(decoded_arguments['variants']))

    return decoded_arguments
