from flask import (
    Blueprint,
    request,
    render_template,
    flash,
    redirect,
    url_for,
    session,
    make_response,
    jsonify,
)
from flask_login import login_user, logout_user, login_required, current_user, LoginManager
from database.database import get_db_connection
from database.models import User


auth = Blueprint("auth", __name__)


login_manager = LoginManager()


@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)


@login_manager.unauthorized_handler
def unauthorized_callback():
    return render_template("unauthorized.html")


def init_login_manager(app):
    login_manager.init_app(app)


@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        db_session = get_db_connection()
        email = request.form["useremail"]
        password = request.form["password"]

        user = db_session.query(User).filter_by(user_email=email).first()

        if user is not None:
            password_check = user.check_password(password)
            if password_check:
                user._authenticated = True
                db_session.add(user)
                db_session.commit()
                login_user(user)  # 사용자가 로그인
                print(login_user(user))
                # flash("Logged in successfully.")
                return redirect(url_for("home"))

        flash("이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.")

    return render_template("login.html")


@auth.route("/logout")
@login_required
def logout():
    current_user._authenticated = False  # 사용자가 로그아웃 하였으므로 _authenticated를 False로 설정
    logout_user()  # 로그아웃
    # flash("Logged out successfully.")
    return redirect(url_for("not_logged_home"))


@auth.route("/signup", methods=["GET", "POST"])
def signup():
    db_session = get_db_connection()
    if request.method == "POST":
        name = request.form.get("name")
        email = request.form.get("useremail")
        password = request.form.get("password")

        # 새로운 user 생성
        new_user = User(username=name, user_email=email)
        new_user.set_password(password)

        # db에 유저 저장
        db_session.add(new_user)
        db_session.commit()

        return redirect(url_for("auth.login"))

    else:
        response = make_response(render_template("signup.html"))
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response


@auth.route("/check_duplicate", methods=["POST"])
def check_duplicate():
    db_session = get_db_connection()
    email = request.form.get("useremail")

    user = db_session.query(User).filter_by(user_email=email).first()

    if user:
        return jsonify({"success": False, "message": "사용할 수 없는 이메일입니다."})
    else:
        return jsonify({"success": True, "message": "사용 가능한 이메일입니다."})
