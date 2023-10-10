import os

from flask import Flask, render_template, redirect, url_for
from flask_login import login_required, current_user

from app.ai_feedback import ai_feedback
from app.auth import auth, init_login_manager
from app.board import board
from app.coding_test import coding_test
from app.config import Config
from app.csrf_protection import init_csrf
from app.game import game
from app.game_score import game_score
from app.user_profile import user_profile


app = Flask(__name__, static_folder="app/static")
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "app", "templates")
app.secret_key = Config.SECRET_KEY  # session 연결을 위한 키

app.register_blueprint(ai_feedback)
app.register_blueprint(auth)
app.register_blueprint(board)
app.register_blueprint(coding_test)
app.register_blueprint(game)
app.register_blueprint(game_score)
app.register_blueprint(user_profile)

init_login_manager(app)
init_csrf(app)


@app.route("/")
def not_logged_home():
    if current_user.is_authenticated:
        return redirect(url_for("home"))
    return render_template("main.html")


@app.route("/main")
@login_required
def home():
    return render_template("main2.html")


if __name__ == "__main__":
    app.run("0.0.0.0", port="5000", debug=True)