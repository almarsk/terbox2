import os

def validate_flow(path, flow):
    full_path = f"./{path}/{flow.lower()}.json"
    if os.path.exists(full_path):
        return True
    else:
        return False
