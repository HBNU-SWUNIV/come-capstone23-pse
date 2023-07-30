from flask import Blueprint, render_template, session, request
from database.models import QList
from app.compile import c_compile_code, python_run_code, cpp_compile_code, grade_code
from database.database import get_db_connection
import html

coding_test = Blueprint("coding_test", __name__)


@coding_test.route("/test_list")
def test_list():
    conn = get_db_connection()

    q_list = conn.query(QList.q_id, QList.q_level, QList.q_name).all()

    return render_template("test_list.html", q_list=q_list)


@coding_test.route("/test/<int:q_id>")
def test_view(q_id):
    conn = get_db_connection()

    q_info = conn.query(QList).filter(QList.q_id == q_id).first()

    q_info.ex_print = q_info.ex_print.replace("\n", "<br>")

    session["q_id"] = q_id

    return render_template("test.html", q_list=q_info)


@coding_test.route("/compile", methods=["POST"])
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


@coding_test.route("/submit", methods=["POST"])
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


@coding_test.route("/answer")
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
