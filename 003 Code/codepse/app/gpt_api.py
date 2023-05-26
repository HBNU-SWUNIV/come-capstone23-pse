import openai
from app.config import Config

# chatgpt api 인증
openai.api_key = Config.CHATGPT_KEY


def get_feedback(problem_description, code):
    prompt = f"아래 주어진 코드는 C언어로 작성된 코드이며, 사용자로부터 입력을 받아 {problem_description}를 수행한다.\n\n{code}\n\n 다음 코드의 오류에 대한 수정 제안을 해줘. (오류가 없으면 '오류 없음'으로 출력)\n\n:"
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
