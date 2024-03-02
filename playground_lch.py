from langchain_openai import ChatOpenAI
from langchain_core.messages.system import SystemMessage
from convcore import api_key

with open("playground_lch_result", "a") as p:
    api_key()
    task="""Arnold: ahoj jak se máš?
    Beruška: čau jo dobře, mám se fajn. co teď děláš?
    Arnold: jenom tady tak uklízím

    v této konverzaci Arnold buď

    a) prozradil co dělá
    b) říkal nesmysl
    c) neodpověděl na otázku Berušky

    tvá odpověď:

    Jasně! z nabídnutých variant volil mluvčí variantu
    """
    chat = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.5)
    messages = list()
    messages.append(SystemMessage(content=task))

    result = chat.invoke(messages)
    print(result)
    p.write("\n"+result.content)
