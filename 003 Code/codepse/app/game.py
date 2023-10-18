from flask import Blueprint, jsonify, render_template, request
from flask_login import current_user, login_required
from sqlalchemy.sql import func, desc

from app.csrf_protection import csrf
from database.database import get_db_connection
from database.models import TypingGame, DragGame, OutputGame, OutputGameScore, User


game = Blueprint("game", __name__)


@game.route("/typinggame")
@login_required
def typinggame():
    return render_template("typinggame.html")


@game.route("/api/get_typinggame_questions")
@csrf.exempt
def get_typinggame_questions():
    conn = get_db_connection()
    # 랜덤으로 문제 선택
    typinggame_questions = conn.query(TypingGame).order_by(func.random()).first()
    conn.close()

    return jsonify(
        {
            "code": typinggame_questions.code,
            "language": typinggame_questions.language,
            "description": typinggame_questions.description,
        }
    )


@game.route("/draggame")
@login_required
def draggame():
    return render_template("draggame.html")


@game.route("/api/get_draggame_questions")
@csrf.exempt
def get_draggame_questions():
    conn = get_db_connection()

    # 모든 draggame 문제를 가져옴
    draggame_questions = conn.query(DragGame).all()

    allQuestions = []
    for allQuestion in draggame_questions:
        allQuestions.append(
            {
                "language": allQuestion.language,
                "text": allQuestion.text,
                "code": allQuestion.code,
                "answers": allQuestion.answers,
                "options": allQuestion.options,
            }
        )
    conn = get_db_connection()

    return jsonify(allQuestions)


@game.route("/outputgame")
@login_required
def outputgame():
    return render_template("outputgame.html")


@game.route("/api/get_outputgame_questions")
@csrf.exempt
def get_outputgame_questions():
    conn = get_db_connection()
    outputgame_questions = conn.query(OutputGame).all()

    questions = []
    for question in outputgame_questions:
        questions.append(
            {
                "language": question.language,
                "question": question.question,
                "answer": question.answer,
            }
        )

    conn = get_db_connection()

    return jsonify(questions)
