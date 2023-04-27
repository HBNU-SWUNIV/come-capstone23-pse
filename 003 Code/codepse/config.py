import json

with open("secrets.json") as f:
    secrets = json.load(f)


class Config(object):
    CHATGPT_KEY = secrets["chatgpt_api_key"]
