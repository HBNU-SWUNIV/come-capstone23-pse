import os
from flask import Flask, render_template, redirect, url_for, flash
from flask_login import login_required, current_user

from app.auth import auth, init_login_manager
from app.game import game
from app.coding_test import coding_test
from app.ai_feedback import ai_feedback
from app.board import board

from database.database import get_db_connection
from database.models import Board, CodeSubmission, QList, Comments

from app.config import Config

app = Flask(__name__, static_folder="app/static")

app.register_blueprint(game)
app.register_blueprint(auth)
app.register_blueprint(coding_test)
app.register_blueprint(ai_feedback)
app.register_blueprint(board)

app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app", "templates")

app.secret_key = Config.SECRET_KEY  # session 연결을 위한 키

init_login_manager(app)


@app.route("/")
def not_logged_home():
    return render_template("main.html")


@app.route("/main")
@login_required
def home():
    return render_template("main2.html")


@app.route("/mypage")
@login_required
def mypage():
    db_session = get_db_connection()
    user_posts = db_session.query(Board).filter_by(user_id=current_user.id).all()  # 사용자의 게시물 가져오기
    user_codes = (  # 사용자가 작성한 코드 정보 가져오기
        db_session.query(CodeSubmission, QList)
        .join(QList, CodeSubmission.q_id == QList.q_id)
        .filter(CodeSubmission.user_id == current_user.id)
        .all()
    )

    user_comments = (
        db_session.query(Comments).filter_by(user_id=current_user.id).all()
    )  # 사용자가 작성한 댓글 정보 가져오기

    db_session.close()

    return render_template(
        "mypage.html", user_posts=user_posts, user_codes=user_codes, user_comments=user_comments
    )


@app.route("/mycode/<int:submission_id>")
def mycode(submission_id):
    db_session = get_db_connection()
    code_submission = (
        db_session.query(CodeSubmission).filter_by(submission_id=submission_id).first()
    )

    # 해당 code_submission에 연관된 q_list 정보를 가져옵니다.
    q_list = db_session.query(QList).filter_by(q_id=code_submission.q_id).first()

    db_session.close()

    return render_template("mycode.html", code_submission=code_submission, q_list=q_list)


@app.route("/delete_code/<int:submission_id>", methods=["POST"])
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

    return redirect(url_for("mypage"))


if __name__ == "__main__":
    app.run("0.0.0.0", port="5000", debug=True)
