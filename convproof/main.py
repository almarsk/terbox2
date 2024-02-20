import os
import json
import jsonschema
from jsonschema import validate
from .proof_exception import ProofException
from .proof_references import proof_references

def validate_flow(path, flow, return_flow=False):
    issues = list()
    bot = dict()
    schema = dict()
    result = dict()
    full_path = f"./{path}/{flow.lower()}.json"

    from app import db, Flow

    flow_data = Flow.query.filter_by(flow_name=flow).first()

    # check valid path
    if flow_data is None:
        issues.append("no such bot")
        result =  {
            "success": False,
            "message": ProofException(issues).message
        }
    else:
        bot = flow_data.flow
        # print(bot)

        with open("convproof/schema.json", "r") as s:
            schema = json.loads(s.read())

        # check structure and non-empty fields
        validator = jsonschema.Draft7Validator(schema)
        [issues.append(f"{e.message}, found in {', '.join(list(e.schema_path))}") for e in validator.iter_errors(bot)]



        # check references
        if not issues:
            proof_references(bot, issues)

        print("todo check that there isnt only $")
        print("todo check that there is a state_intro and a state_outro only $")

        result = dict()

        if return_flow and not issues:
            return bot
        elif return_flow and issues:
            raise ProofException(issues)
        elif issues:
            result =  {
                "success": False,
                "message": ProofException(issues).message
            }
        else:
            result =  {
                "success": True,
                "message": f"Flow {flow} is valid."
            }


    return result
