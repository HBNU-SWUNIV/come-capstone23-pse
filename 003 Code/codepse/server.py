import os
import html
from flask import Flask, render_template, request, session, redirect, url_for
from database.database import get_db_connection
from app.gpt_api import get_feedback, generate_response
from database.models import User, QList, TypingGame, DragGame, OutputGame
from app.compile import c_compile_code, python_run_code, cpp_compile_code, grade_code
from app.config import Config
from sqlalchemy.sql import func
from flask import jsonify
from werkzeug.security import generate_password_hash

app = Flask(__name__, static_folder="app/static")
app.template_folder = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "app", "templates"
)

app.secret_key = Config.SECRET_KEY  # session 연결을 위한 키


@app.route("/")
def home():
    return render_template("main.html")


@app.route("/login")
def login():
    return render_template("login.html")


@app.route("/signup", methods=["GET", "POST"])
def signup():
    session = get_db_connection()
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("username")
        password = request.form.get("password")

        # 존재하는 user인지 확인
        user = session.query(User).filter_by(user_email=email).first()
        if user:
            return 'User already exists.'

        # 새로운 user 생성
        new_user = User(username=name, user_email=email)
        new_user.set_password(password)
        
        # db에 유저 저장
        session.add(new_user)
        session.commit()

        return redirect(url_for('login'))  # assuming you have a login route
    else:
        return render_template("signup.html")


@app.route('/check_duplicate', methods=['POST'])
def check_duplicate():
    session = get_db_connection()
    email = request.form.get('username')

    # 존재하는 user인지 확인
    user = session.query(User).filter_by(user_email=email).first()

    if user:
        return jsonify({'message': '사용할 수 없는 이메일입니다.'})
    else:
        return jsonify({'message': '사용 가능한 이메일입니다.'})

    

@app.route("/test_list")
def test_list():
    # 데이터베이스 연결
    conn = get_db_connection()

    # 데이터베이스에서 데이터 가져오기
    q_list = conn.query(QList.q_id, QList.q_level, QList.q_name).all()

    # 가져온 데이터를 html 파일에 전달하기..
    return render_template("test_list.html", q_list=q_list)


# 상세보기 페이지
@app.route("/test/<int:q_id>")
def test_view(q_id):
    conn = get_db_connection()

    # 해당 문제 정보 가져오기
    q_info = conn.query(QList).filter(QList.q_id == q_id).first()

    # 개행 문자를 <br> 태그로 변환
    q_info.ex_print = q_info.ex_print.replace("\n", "<br>")

    #  세션에 현재 질문 ID를 저장하며, /submit 라우터는 이 ID를 사용하여 데이터베이스에서 해당 질문의 정답을 가져옴.
    session["q_id"] = q_id

    return render_template("test.html", q_list=q_info)


@app.route("/compile", methods=["POST"])
def compile():
    code = request.form.get("code")
    language = request.form.get("language")

    session["language"] = language  # 여기에서 언어 정보를 세션에 저장

    if language == "python":
        output_str = python_run_code(code)
    elif language == "c":
        output_str = c_compile_code(code)
    elif language == "c++":
        output_str = cpp_compile_code(code)

    return output_str


@app.route("/submit", methods=["POST"])
def submit():
    conn = get_db_connection()

    code = request.form.get("code")
    language = request.form.get("language")

    session["language"] = language  # 여기에서 언어 정보를 세션에 저장

    if language == "python":
        output_str = python_run_code(code)
    elif language == "c":
        output_str = c_compile_code(code)
    elif language == "c++":
        output_str = cpp_compile_code(code)

    q_info = conn.query(QList).filter(QList.q_id == session["q_id"]).first()
    expected_output = q_info.answer

    result = grade_code(output_str, expected_output)

    return result  # 채점 결과를 반환


@app.route("/answer")
def answer():
    conn = get_db_connection()

    q_info = conn.query(QList).filter(QList.q_id == session["q_id"]).first()

    # 세션의 언어 정보에 따라 C 언어 정답 코드 혹은 Python 정답 코드를 가져옴
    if session["language"] == "c":
        answer = html.escape(q_info.c_answer_code)
    elif session["language"] == "python":
        answer = html.escape(q_info.p_answer_code)
    elif session["language"] == "c++":
        answer = html.escape(q_info.cpp_answer_code)

    return "<pre>" + answer + "</pre>"


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


@app.route("/typinggame")
def typinggame():
    return render_template("typinggame.html")


@app.route("/api/get_typinggame_questions")
def get_typinggame_questions():
    conn = get_db_connection()
    typinggame_questions = conn.query(
        TypingGame).order_by(func.random()).first()

    return jsonify({
        "code": typinggame_questions.code,
        "language": typinggame_questions.language,
        "description": typinggame_questions.description
    })


@app.route("/draggame")
def draggame():
    return render_template("draggame.html")


@app.route("/api/get_draggame_questions")
def get_draggame_questions():
    conn = get_db_connection()
    draggame_questions = conn.query(DragGame).all()

    allQuestions = []
    for allQuestion in draggame_questions:
        allQuestions.append({
            "language": allQuestion.language,
            "text": allQuestion.text,
            "code": allQuestion.code,
            "answers": allQuestion.answers,
            "options": allQuestion.options
        })

    return jsonify(allQuestions)


@app.route("/outputgame")
def outputgame():
    return render_template("outputgame.html")


@app.route("/api/get_outputgame_questions")
def get_outputgame_questions():
    conn = get_db_connection()
    outputgame_questions = conn.query(OutputGame).all()

    questions = []
    for question in outputgame_questions:
        questions.append({
            "language": question.language,
            "question": question.question,
            "answer": question.answer
        })

    return jsonify(questions)


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
