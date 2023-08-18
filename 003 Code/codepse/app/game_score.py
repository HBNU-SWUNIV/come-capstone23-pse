from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_login import current_user

from app.csrf_protection import csrf
from database.database import get_db_connection
from database.models import OutputGameScore


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

    conn = get_db_connection()
    game_score = OutputGameScore(
        user_id=current_user.id,
        output_language=language,
        output_score=score,
        played_at=datetime.now(),
    )

    conn.add(game_score)
    conn.commit()

    return jsonify({"message": "Game result saved successfully!"})


@game_score.route("/get_highscore", methods=["GET"])
def get_highscore():
    conn = get_db_connection()
    user_id = request.args.get("user_id")  # 요청에서 user_id 가져오기

    # 데이터베이스에서 user_id에 해당하는 최고 점수 찾기
    score_data = conn.query(OutputGameScore).filter_by(user_id=user_id).first()

    if score_data:
        return jsonify({"language": score_data.output_language, "score": score_data.output_score})
    else:
        return jsonify({"error": "User not found"}), 404
