import os
from flask import (
    Flask,
    render_template,
    request,
    session,
)
from app.auth import auth
from app.game import game
from app.coding_test import coding_test

from database.database import get_db_connection
from database.models import QList
from app.gpt_api import get_feedback, generate_response
from app.config import Config

app = Flask(__name__, static_folder="app/static")

app.register_blueprint(game)
app.register_blueprint(auth)
app.register_blueprint(coding_test)

app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app", "templates")

app.secret_key = Config.SECRET_KEY  # session 연결을 위한 키


@app.route("/")
def home():
    return render_template("main.html")


@app.route("/feedback")
def feedback():
    code = request.form.get("code")
    language = request.form.get("language")

    conn = get_db_connection()
    q_info = conn.query(QList).filter(QList.q_id == session["q_id"]).first()
    problem_description = q_info.q_content
    feedback = get_feedback(problem_description, code, language)
    return feedback


@app.route("/ai_chatbot")
def ai_chatbot():
    return render_template("ai_chatbot.html")


@app.route("/ai_chatbot_submit", methods=["GET", "POST"])
def ai_chatbot_submit():
    if request.method == "POST":
        content = request.form["userText"]
        chatbot_response = generate_response(content)
        # 이제 'content'에 사용자가 입력한 텍스트가 저장되어 있습니다.
        # 이 변수를 원하는 대로 사용할 수 있습니다.
    return chatbot_response


@app.route("/board_list")
def board_list():
    return render_template("board_list.html")


@app.route("/board_detail")
def board_detail():
    return render_template("board_detail.html")


@app.route("/mypage")
def mypage():
    return render_template("mypage.html")


if __name__ == "__main__":
    app.run("0.0.0.0", port="5000", debug=True)
