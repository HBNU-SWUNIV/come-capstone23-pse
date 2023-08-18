from flask import Blueprint, render_template, request, session
from flask_login import login_required

from app.csrf_protection import csrf
from app.gpt_api import get_feedback, generate_response
from database.database import get_db_connection
from database.models import QList

ai_feedback = Blueprint("ai", __name__)


@ai_feedback.route("/feedback")
@csrf.exempt
def feedback():
    code = request.form.get("code")
    language = request.form.get("language")

    conn = get_db_connection()
    q_info = conn.query(QList).filter(QList.q_id == session["q_id"]).first()
    problem_description = q_info.q_content
    feedback = get_feedback(problem_description, code, language)
    conn.close()
    return feedback


@ai_feedback.route("/ai_chatbot")
@login_required
def ai_chatbot():
    return render_template("ai_chatbot.html")


@ai_feedback.route("/ai_chatbot_submit", methods=["GET", "POST"])
@csrf.exempt
def ai_chatbot_submit():
    if request.method == "POST":
        content = request.form["userText"]
        chatbot_response = generate_response(content)
        return chatbot_response
