from flask import Blueprint, jsonify, render_template
from flask_login import login_required
from database.database import get_db_connection
from database.models import TypingGame, DragGame, OutputGame
from sqlalchemy.sql import func

game = Blueprint("game", __name__)


@game.route("/typinggame")
@login_required
def typinggame():
    return render_template("typinggame.html")


@game.route("/api/get_typinggame_questions")
def get_typinggame_questions():
    conn = get_db_connection()
    typinggame_questions = conn.query(TypingGame).order_by(func.random()).first()

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
def get_draggame_questions():
    conn = get_db_connection()
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

    return jsonify(allQuestions)


@game.route("/outputgame")
@login_required
def outputgame():
    return render_template("outputgame.html")


@game.route("/api/get_outputgame_questions")
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

    return jsonify(questions)
