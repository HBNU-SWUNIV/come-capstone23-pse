from flask import Blueprint, render_template, redirect, url_for, flash
from flask_login import login_required, current_user

from app.forms import DeleteForm

from database.database import get_db_connection
from database.models import (
    Board,
    CodeSubmission,
    QList,
    Comments,
    OutputGameScore,
    DragGameScore,
)

user_profile = Blueprint("user_profile", __name__)


@user_profile.route("/mypage")
@login_required
def mypage():
    db_session = get_db_connection()

    # 사용자의 게시물 가져오기
    user_posts = db_session.query(Board).filter_by(user_id=current_user.id).all()

    # 사용자가 작성한 코드 정보 가져오기
    user_codes = (
        db_session.query(CodeSubmission, QList)
        .join(QList, CodeSubmission.q_id == QList.q_id)
        .filter(CodeSubmission.user_id == current_user.id)
        .order_by(CodeSubmission.submission_time.desc())  # 내림차순 정렬
        .all()
    )

    # 사용자가 작성한 댓글 정보 가져오기
    user_comments = db_session.query(Comments).filter_by(user_id=current_user.id).all()

    # 게임 기록 가져오기
    output_game_scores = (
        db_session.query(OutputGameScore)
        .filter_by(user_id=current_user.id)
        .order_by(OutputGameScore.output_score.desc(), OutputGameScore.played_at.desc())
        .all()
    )
    drag_game_scores = (
        db_session.query(DragGameScore)
        .filter_by(user_id=current_user.id)
        .order_by(DragGameScore.drag_score.desc(), DragGameScore.played_at.desc())
        .all()
    )

    game_results = []
    for score in output_game_scores:
        game_results.append(
            {
                "game_name": "out game",
                "language": score.output_language,
                "score": score.output_score,
                "played_at": score.played_at,
            }
        )
    for score in drag_game_scores:
        game_results.append(
            {
                "game_name": "drag game",
                "language": score.drag_language,
                "score": score.drag_score,
                "played_at": score.played_at,
            }
        )

    db_session.close()

    return render_template(
        "mypage.html",
        user_posts=user_posts,
        user_codes=user_codes,
        user_comments=user_comments,
        game_results=game_results,  # 추가된 게임 결과 리스트
    )


@user_profile.route("/mycode/<int:submission_id>")
@login_required
def mycode(submission_id):
    db_session = get_db_connection()
    code_submission = (
        db_session.query(CodeSubmission).filter_by(submission_id=submission_id).first()
    )

    # 해당 코드 제출이 존재하지 않거나 현재 로그인한 사용자의 ID와 코드 제출의 사용자 ID가 다르면 접근을 거부함
    if not code_submission or code_submission.user_id != current_user.id:
        flash("코드에 대한 접근 권한이 없습니다.")
        db_session.close()
        return redirect(url_for("user_profile.mypage"))

    # 해당 code_submission에 연관된 q_list 정보를 가져옴.
    q_list = db_session.query(QList).filter_by(q_id=code_submission.q_id).first()

    form = DeleteForm()

    db_session.close()

    return render_template(
        "mycode.html", code_submission=code_submission, q_list=q_list, form=form
    )


@user_profile.route("/delete_code/<int:submission_id>", methods=["POST"])
def delete_code(submission_id):
    db_session = get_db_connection()
    code_submission = (
        db_session.query(CodeSubmission).filter_by(submission_id=submission_id).first()
    )

    if code_submission:
        db_session.delete(code_submission)
        db_session.commit()
        flash("코드가 성공적으로 삭제되었습니다.")
    else:
        flash("코드를 찾을 수 없습니다.")

    db_session.close()

    return redirect(url_for("user_profile.mypage"))
