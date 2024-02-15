import os
import json
import jsonschema
from jsonschema import validate
from .proof_exception import ProofException
from .proof_references.main import proof_references

def validate_flow(path, flow, return_flow=False):
    issues = list()
    bot = dict()
    schema = dict()
    full_path = f"./{path}/{flow.lower()}.json"

    if not os.path.exists(full_path):
        issues.append("invalid path")
    else:
        with open(full_path, "r") as b:
            bot = json.loads(b.read())
        with open("convproof/schema.json", "r") as s:
            schema = json.loads(s.read())

        validator = jsonschema.Draft7Validator(schema)
        [issues.append(e) for e in validator.iter_errors(bot)]

        proof_references(bot, issues)

        if issues:
           raise ProofException(issues)
        if return_flow:
            return bot
        else:
            return not issues
