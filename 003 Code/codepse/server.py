import os
from flask import Flask, render_template
from flask_login import login_required

from app.auth import auth, init_login_manager
from app.game import game
from app.coding_test import coding_test
from app.ai_feedback import ai_feedback

from database.models import User
from app.config import Config

app = Flask(__name__, static_folder="app/static")

app.register_blueprint(game)
app.register_blueprint(auth)
app.register_blueprint(coding_test)
app.register_blueprint(ai_feedback)

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


@app.route("/save_code")
def code_save():
    return "<h2>테스트</h2>"


@app.route("/board_list")
def board_list():
    return render_template("board_list.html")


@app.route("/board_detail")
def board_detail():
    return render_template("board_detail.html")


@app.route("/mypage")
@login_required
def mypage():
    return render_template("mypage.html")


if __name__ == "__main__":
    app.run("0.0.0.0", port="5000", debug=True)