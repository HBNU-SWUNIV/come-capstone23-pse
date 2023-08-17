import os
import logging

from flask import (
    Blueprint,
    Flask,
    render_template,
    request,
    redirect,
    send_from_directory,
    url_for,
    flash,
    jsonify,
)
from flask_login import current_user, login_required

from app.forms import BoardWriteForm, BoardEditForm, CommentForm
from database.database import get_db_connection
from database.models import Board, User, Comments

board = Blueprint("board", __name__)

PER_PAGE = 10


@board.route("/board_list")
@login_required
def board_list():
    page = request.args.get("page", 1, type=int)
    search_query = request.args.get("search_query", None)
    search_type = request.args.get("search_type", "title")

    db_session = get_db_connection()

    query = (
        db_session.query(Board, User)
        .join(User, Board.user_id == User.id)
        .order_by(Board.created_at.desc())
    )

    if search_query:
        if search_type == "title":
            query = query.filter(Board.title.contains(search_query))
        elif search_type == "username":
            query = query.filter(User.username.contains(search_query))

    total_boards = query.count()

    boards = query.offset((page - 1) * PER_PAGE).limit(PER_PAGE).all()

    # 동적으로 게시글 번호를 부여
    for idx, (board, user) in enumerate(boards, start=(page - 1) * PER_PAGE + 1):
        board.display_number = idx

    db_session.close()

    return render_template(
        "board_list.html",
        boards=boards,
        current_page=page,
        total_pages=(total_boards + PER_PAGE - 1) // PER_PAGE,
        search_query=search_query,
    )


@board.route("/board_detail/<int:board_id>")
def board_detail(board_id):
    form = CommentForm()

    db_session = get_db_connection()

    # 해당 ID를 가진 게시글 가져오기
    board_instance = (
        db_session.query(Board, User)
        .join(User, Board.user_id == User.id)
        .filter(Board.board_id == board_id)
        .first()
    )
    comments = (
        db_session.query(Comments, User)
        .join(User, Comments.user_id == User.id)
        .filter(Comments.board_id == board_id)
        .all()
    )

    if not board_instance:
        flash("게시글을 찾을 수 없습니다.", "error")
        return redirect(url_for("board.board_list"))

    if board_instance.Board.file_path:
        is_image = any(
            extension in file
            for extension in [".png", ".jpg", ".jpeg", ".gif"]
            for file in board_instance.Board.file_path
        )
    else:
        is_image = False

    if board_instance.Board.file_path is None:
        board_instance.Board.file_path = []

    # 조회수 1 증가시키기
    board_instance.Board.view += 1
    db_session.commit()

    return render_template(
        "board_detail.html", form=form, post=board_instance, is_image=is_image, comments=comments
    )


# 파일 업로드를 위한 설정
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads/")

# 전역 변수로 정의하여 사용 (이 부분은 Flask 앱의 config로 설정할 수도 있습니다.)
UPLOAD_PATH = UPLOAD_FOLDER


def unique_filename(file_name):
    counter = 1
    name, extension = os.path.splitext(file_name)  # 파일 이름과 확장자를 분리
    new_name = file_name  # 처음에는 원본 파일 이름을 사용

    # 파일이 존재하는 경우, 카운터를 붙여 이름을 변경
    while os.path.exists(os.path.join(UPLOAD_PATH, new_name)):
        new_name = f"{name}_{counter}{extension}"  # 중복되지 않는 이름 생성
        counter += 1

    return new_name  # 변경된 이름을 반환


@board.route("/board_write", methods=["GET", "POST"])
def board_write():
    form = BoardWriteForm()  # 폼 객체 생성

    if form.validate_on_submit():
        title = form.title.data
        content = form.content.data
        files = request.files.getlist("file")
        file_paths = []

        for file in files:
            if file and file.filename:
                original_filename = file.filename
                safe_filename = unique_filename(original_filename)
                file.save(os.path.join(UPLOAD_PATH, safe_filename))
                file_paths.append(safe_filename)

        if not file_paths:
            file_paths = None

        new_post = Board(
            user_id=current_user.id, title=title, content=content, file_path=file_paths, view=0
        )

        db_session = get_db_connection()
        try:
            db_session.add(new_post)
            db_session.commit()

            # 방금 생성된 게시글의 ID를 사용하여 상세 페이지로 리디렉션
            flash("게시글이 성공적으로 작성되었습니다.")  # 메시지 전달
            return redirect(url_for("board.board_detail", board_id=new_post.board_id))
        except Exception as e:
            logging.error(f"Error updating board: {e}")
            db_session.rollback()
            flash("게시글 수정 중 오류가 발생했습니다.")  # 메시지 전달
            return redirect(url_for("board.board_list"))
        finally:
            db_session.close()

    return render_template("board_write.html", form=form)  # 템플릿에 폼 객체 전달


@board.route("/board_edit/<int:board_id>", methods=["GET", "POST"])
def board_edit(board_id):
    form = BoardEditForm()

    db_session = get_db_connection()
    board_instance = db_session.query(Board).filter(Board.board_id == board_id).first()

    if not board_instance:
        return redirect(url_for("board.board_list", message="게시글을 찾을 수 없습니다."))

    if board_instance.user_id != current_user.id:
        return redirect(url_for("board.board_detail", board_id=board_id, message="수정 권한이 없습니다."))

    if request.method == "GET":
        form.title.data = board_instance.title
        form.content.data = board_instance.content

    if form.validate_on_submit():
        board_instance.title = form.title.data
        board_instance.content = form.content.data

        # 파일 업로드 처리
        files = request.files.getlist("file")
        file_paths = board_instance.file_path or []

        for file in files:
            if file and file.filename:
                original_filename = file.filename
                safe_filename = unique_filename(original_filename)
                file.save(os.path.join(UPLOAD_PATH, safe_filename))
                file_paths.append(safe_filename)

        # 삭제할 파일 리스트 처리
        files_to_remove = request.form.getlist("remove_files")
        for file_to_remove in files_to_remove:
            if file_to_remove in file_paths:
                file_path_to_remove = os.path.join(UPLOAD_PATH, file_to_remove)
                if os.path.exists(file_path_to_remove):
                    os.remove(file_path_to_remove)
                file_paths.remove(file_to_remove)

        board_instance.file_path = file_paths if file_paths else None

        try:
            db_session.commit()
            flash("게시글이 성공적으로 수정되었습니다.")  # 메시지 전달
            return redirect(url_for("board.board_detail", board_id=board_id))
        except Exception as e:
            db_session.rollback()
            flash("게시글 수정 중 오류가 발생했습니다.")  # 메시지 전달
            return redirect(url_for("board.board_detail", board_id=board_id))
        finally:
            db_session.close()

    return render_template("board_edit.html", post=board_instance, form=form)


@board.route("/board_delete/<int:board_id>")
def board_delete(board_id):
    db_session = get_db_connection()
    board_instance = db_session.query(Board).filter(Board.board_id == board_id).first()

    if not board_instance:
        return redirect(url_for("board.board_list", message="게시글을 찾을 수 없습니다."))

    if board_instance.user_id != current_user.id:
        return redirect(url_for("board.board_detail", board_id=board_id, message="삭제 권한이 없습니다."))

    try:
        db_session.delete(board_instance)
        db_session.commit()
        flash("게시글이 성공적으로 삭제되었습니다.")
        return redirect(url_for("board.board_list"))
    except:
        db_session.rollback()
        flash("게시글 삭제 중 오류가 발생했습니다.")
        return redirect(url_for("board.board_list"))


@board.route("/uploads/<filename>")
def get_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@board.route("/board_detail/<int:board_id>/add_comment", methods=["POST"])
@login_required
def add_comment(board_id):
    form = CommentForm()  # 폼 인스턴스 생성

    if form.validate_on_submit():
        content = form.comment.data
        new_comment = Comments(user_id=current_user.id, board_id=board_id, content=content)

        db_session = get_db_connection()
        try:
            db_session.add(new_comment)
            db_session.commit()
            flash("댓글이 성공적으로 추가되었습니다.", "success")
        except:
            db_session.rollback()
            flash("댓글 추가 중 오류가 발생했습니다.", "error")
        finally:
            db_session.close()

    return redirect(url_for("board.board_detail", form=form, board_id=board_id))


@board.route("/edit_comment/<int:comment_id>", methods=["POST"])
@login_required
def edit_comment(comment_id):
    db_session = get_db_connection()
    comment = db_session.query(Comments).filter_by(id=comment_id).first()

    if comment.user_id != current_user.id:
        flash("권한이 없습니다.", "error")
        return redirect(url_for("board.board_detail", board_id=comment.board_id))

    comment.content = request.form.get("new_content")
    try:
        db_session.commit()
        flash("댓글이 성공적으로 수정되었습니다.", "success")
        return jsonify({"status": "success"})
    except:
        db_session.rollback()
        flash("댓글 수정 중 오류가 발생했습니다.", "error")
        return jsonify({"status": "error"})
    finally:
        db_session.close()

    # return redirect(url_for('board.board_detail', board_id=comment.board_id))


@board.route("/delete_comment/<int:comment_id>", methods=["POST"])
@login_required
def delete_comment(comment_id):
    db_session = get_db_connection()
    comment = db_session.query(Comments).filter_by(id=comment_id).first()

    if comment.user_id != current_user.id:
        flash("권한이 없습니다.", "error")
        return redirect(url_for("board.board_detail", board_id=comment.board_id))

    try:
        db_session.delete(comment)
        db_session.commit()
        flash("댓글이 성공적으로 삭제되었습니다.", "success")
        return jsonify({"status": "success"})
    except:
        db_session.rollback()
        flash("댓글 삭제 중 오류가 발생했습니다.", "error")
        return jsonify({"status": "error"})
    finally:
        db_session.close()

    # return redirect(url_for('board.board_detail', board_id=comment.board_id))
