from langchain_openai import ChatOpenAI, OpenAI
from langchain_core.messages.system import SystemMessage
from langchain_core.messages.human import HumanMessage
from langchain_core.messages.ai import AIMessage
from .utilz import api_key

def resolve_prompt(args: dict):
    api_key()
    messages = list()
    last = "Co myslíš, bude dneska pršet?"
    if args["context"]:
        messages += [SystemMessage(content="Dosavadní konverzace:")]

        messages += [
            AIMessage(content=say["say"]) if say["who"] == "bot"
            else HumanMessage(content=say["say"])
            for say in args["context"]
        ]

        messages+=[SystemMessage(content=f"""\
Robot {args["prompt"]}.\
Vezme přitom v potaz informace v předchozí informaci a na základě nich odhadne nejlepší možnou odpověď.\
Odpovídá stručně, jednou větou, maximálně 10 slov.

Jasně, odpověď by mohla vypadat třeba takhle:""")]

    else:
        messages.append(SystemMessage(
            content=f"""There is a conversation
Your task is to give the next answer
The answer description:
{args["prompt"]}"""))

    try:
        chat = ChatOpenAI(model="gpt-4-1106-preview", temperature=0)
        result = chat.invoke(messages)

        args["log"]([[m.content for m in messages], str(result.content)])


        return f'{str(result.content)}'
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return ""
