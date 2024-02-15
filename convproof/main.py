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
    full_path = f"./{path}/{flow.lower()}.json"

    # check valid path
    if not os.path.exists(full_path):
        issues.append("invalid path")
    else:
        with open(full_path, "r") as b:
            try:
                bot = json.loads(b.read())
            except json.JSONDecodeError as e:
                issues.append(e)

        if issues:
           raise ProofException("JSON", issues)

        with open("convproof/schema.json", "r") as s:
            schema = json.loads(s.read())

        # check structure and non-empty fields
        validator = jsonschema.Draft7Validator(schema)
        [issues.append(e) for e in validator.iter_errors(bot)]

        if issues:
           raise ProofException("structure", issues)

        # check references
        proof_references(bot, issues)

        if issues:
            raise ProofException("references",issues)

        issues.append("todo check that there isnt only $")

        if issues:
           raise ProofException("essence",issues)
        if return_flow:
            return bot
        else:
            return not issues
