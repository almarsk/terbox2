import os
import json
import jsonschema
from jsonschema import validate

from .proof_empty import proof_empty
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

        proof_empty(bot, issues)
        proof_references(bot, issues)

        print("todo check that there is a state_intro and a state_outro")

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
