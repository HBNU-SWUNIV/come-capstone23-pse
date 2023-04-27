import openai
from config import Config

# chatgpt api 인증
openai.api_key = Config.CHATGPT_KEY


def get_feedback(code):
    prompt = f"Problem: Hello, world! Print out., Please give provide feedback and fixes in Korean on the following code for the following problem:\n\n{code}\n\nFeedback:"
    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )

    feedback = response.choices[0].text.strip()
    return feedback
