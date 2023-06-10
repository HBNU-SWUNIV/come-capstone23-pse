import openai
from app.config import Config

# chatgpt api 인증
openai.api_key = Config.CHATGPT_KEY


def get_feedback(problem_description, code, language):
    prompt = f"아래 주어진 코드는 {language}(으)로 작성된 코드이며, 사용자로부터 입력을 받아 {problem_description}를 수행한다.\n\n{code}\n\n 다음 코드에 문제가 있으면 수정해줘\n\n:"
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


def generate_response(content):
    prompt = f"{content}\n\n:"
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
