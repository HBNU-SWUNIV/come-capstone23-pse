from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user

from app.csrf_protection import csrf
from database.database import get_db_connection
from database.models import OutputGameScore, DragGameScore, User


game_score = Blueprint("game_score", __name__)


@game_score.route("/api/current_user", methods=["GET"])
def current_user_info():
    if current_user.is_authenticated:
        return {"user_id": current_user.id, "user_email": current_user.user_email}
    else:
        return {"error": "User not logged in"}, 403


@game_score.route("/api/save_game_result", methods=["POST"])
@csrf.exempt
def save_game_result():
    data = request.json

    score = data["score"]
    language = data["language"]
    gameType = data["gameType"]

    conn = get_db_connection()

    if gameType == "drag":
        game_score = DragGameScore(
            user_id=current_user.id,
            drag_language=language,
            drag_score=score,
            played_at=datetime.now(),
        )
    elif gameType == "output":
        game_score = OutputGameScore(
            user_id=current_user.id,
            output_language=language,
            output_score=score,
            played_at=datetime.now(),
        )
    else:
        return jsonify({"message": "Invalid game type!"}), 400

    conn.add(game_score)
    conn.commit()

    return jsonify({"message": "Game result saved successfully!"})


@game_score.route("/get_highscore", methods=["GET"])
def get_highscore():
    conn = get_db_connection()
    user_id = request.args.get("user_id")
    game_type = request.args.get("game_type")  # 요청에서 game_type 가져오기

    if game_type == "draggame":
        score_data = (
            conn.query(DragGameScore)
            .filter_by(user_id=user_id)
            .order_by(DragGameScore.drag_score.desc())
            .first()
        )
        if score_data:
            return jsonify({"language": score_data.drag_language, "score": score_data.drag_score})

    elif game_type == "outputgame":
        score_data = (
            conn.query(OutputGameScore)
            .filter_by(user_id=user_id)
            .order_by(OutputGameScore.output_score.desc())
            .first()
        )
        if score_data:
            return jsonify(
                {"language": score_data.output_language, "score": score_data.output_score}
            )

    return jsonify({"error": "User not found or no score recorded"}), 404


@game_score.route("/get_leaderboard", methods=["GET"])
def get_leaderboard():
    conn = get_db_connection()
    game_type = request.args.get("game_type")

    if game_type == "outputgame":
        leaderboard_data = (
            conn.query(
                User.username,
                OutputGameScore.output_language,
                OutputGameScore.output_score,
                OutputGameScore.played_at,
            )
            .join(User, User.id == OutputGameScore.user_id)
            .order_by(OutputGameScore.output_score.desc(), OutputGameScore.played_at.asc())
            .limit(5)
            .all()
        )

        leaderboard_list = [
            {
                "username": item.username,
                "language": item.output_language,
                "score": item.output_score,
                "played_at": item.played_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for item in leaderboard_data
        ]
        return jsonify(leaderboard_list)

    elif game_type == "draggame":
        leaderboard_data = (
            conn.query(
                User.username,
                DragGameScore.drag_language,
                DragGameScore.drag_score,
                DragGameScore.played_at,
            )
            .join(User, User.id == DragGameScore.user_id)
            .order_by(DragGameScore.drag_score.desc(), DragGameScore.played_at.asc())
            .limit(5)
            .all()
        )

        leaderboard_list = [
            {
                "username": item.username,
                "language": item.drag_language,
                "score": item.drag_score,
                "played_at": item.played_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for item in leaderboard_data
        ]
        return jsonify(leaderboard_list)

    return jsonify({"error": "Invalid game type!"}), 400
