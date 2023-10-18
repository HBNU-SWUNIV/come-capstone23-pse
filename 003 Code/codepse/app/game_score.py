from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user

from app.csrf_protection import csrf
from database.database import get_db_connection
from database.models import OutputGameScore, DragGameScore, User
import pytz


game_score = Blueprint("game_score", __name__)

korea_timezone = pytz.timezone('Asia/Seoul')
current_kst_time = datetime.now(korea_timezone)


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

    current_kst_time = datetime.now(korea_timezone)

    if gameType == "drag":
        game_score = DragGameScore(
            user_id=current_user.id,
            drag_language=language,
            drag_score=score,
            played_at=current_kst_time,
        )
    elif gameType == "output":
        game_score = OutputGameScore(
            user_id=current_user.id,
            output_language=language,
            output_score=score,
            played_at=current_kst_time,
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

    # 각 게임 타입에 따른 지원되는 언어 목록 설정
    if game_type == "outputgame":
        languages = ["Java", "Python", "C", "Random"]
    elif game_type == "draggame":
        languages = ["C", "C#", "C++", "Java", "JavaScript", "Python", "SQL", "Random"]
    else:
        return jsonify({"error": "Invalid game type!"}), 400

    leaderboard_dict = {}

    for lang in languages:
        if game_type == "outputgame":
            leaderboard_data = (
                conn.query(
                    User.username,
                    OutputGameScore.output_language,
                    OutputGameScore.output_score,
                    OutputGameScore.played_at,
                )
                .filter(OutputGameScore.output_language == lang)
                .join(User, User.id == OutputGameScore.user_id)
                .order_by(OutputGameScore.output_score.desc(), OutputGameScore.played_at.asc())
                .limit(5)
                .all()
            )
            leaderboard_key = lang
        else:  # draggame
            leaderboard_data = (
                conn.query(
                    User.username,
                    DragGameScore.drag_language,
                    DragGameScore.drag_score,
                    DragGameScore.played_at,
                )
                .filter(DragGameScore.drag_language == lang)
                .join(User, User.id == DragGameScore.user_id)
                .order_by(DragGameScore.drag_score.desc(), DragGameScore.played_at.asc())
                .limit(5)
                .all()
            )
            leaderboard_key = lang

        leaderboard_dict[leaderboard_key] = [
            {
                "username": item.username,
                "language": item.drag_language if game_type == "draggame" else item.output_language,
                "score": item.drag_score if game_type == "draggame" else item.output_score,
                "played_at": item.played_at.strftime("%Y-%m-%d %H:%M:%S"),
            }
            for item in leaderboard_data
        ]

    return jsonify(leaderboard_dict)