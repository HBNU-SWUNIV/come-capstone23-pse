from flask import (
    Blueprint,
    Flask,
    render_template,
    request,
    redirect,
    send_from_directory,
    url_for,
    flash,
)
from flask_login import current_user, login_required
from werkzeug.utils import secure_filename
import os

from database.database import get_db_connection
from database.models import Board, User

board = Blueprint("board", __name__)


@board.route("/board_list")
@login_required
def board_list():
    db_session = get_db_connection()
    boards = (
        db_session.query(Board, User)
        .join(User, Board.user_id == User.id)
        .order_by(Board.created_at.desc())
        .all()
    )
    db_session.close()

    return render_template("board_list.html", boards=boards)  # boards 변수를 템플릿에 전달


@board.route("/board_detail/<int:board_id>")
def board_detail(board_id):
    db_session = get_db_connection()

    # 해당 ID를 가진 게시글 가져오기
    board_instance = (
        db_session.query(Board, User)
        .join(User, Board.user_id == User.id)
        .filter(Board.board_id == board_id)
        .first()
    )

    if not board_instance:
        flash("게시글을 찾을 수 없습니다.", "error")
        return redirect(url_for("board.board_list"))

    # 조회수 1 증가시키기
    board_instance.Board.view += 1
    db_session.commit()

    return render_template("board_detail.html", post=board_instance)


# 파일 업로드를 위한 설정
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads/")

ALLOWED_EXTENSIONS = set(["txt", "pdf", "png", "jpg", "jpeg", "gif"])

# 전역 변수로 정의하여 사용 (이 부분은 Flask 앱의 config로 설정할 수도 있습니다.)
UPLOAD_PATH = UPLOAD_FOLDER


# 허용된 파일 확장자 체크
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def unique_filename(file_name):
    counter = 1
    file_name_parts = os.path.splitext(file_name)  # split filename and extension
    while os.path.exists(os.path.join(UPLOAD_PATH, file_name)):
        file_name = f"{file_name_parts[0]}_{counter}{file_name_parts[1]}"
        counter += 1

    return file_name


@board.route("/board_write", methods=["GET", "POST"])
def board_write():
    if request.method == "POST":
        title = request.form["title"]
        content = request.form["content"]
        file = request.files["file"]

        if file and allowed_file(file.filename):
            original_filename = secure_filename(file.filename)
            safe_filename = unique_filename(original_filename)
            file.save(os.path.join(UPLOAD_PATH, safe_filename))
            file_path = safe_filename
        else:
            file_path = None

        new_post = Board(
            user_id=current_user.id, title=title, content=content, file_path=file_path, view=0
        )

        db_session = get_db_connection()
        try:
            db_session.add(new_post)
            db_session.commit()
            return redirect(url_for("board.board_list", message="게시글이 성공적으로 작성되었습니다."))
        except Exception as e:
            db_session.rollback()
            return redirect(url_for("board.board_list", message="게시글 작성 중 오류가 발생했습니다."))
        finally:
            db_session.close()

    return render_template("board_write.html")


@board.route("/uploads/<filename>")
def get_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
