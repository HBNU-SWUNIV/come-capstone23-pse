import subprocess
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("home.html")


@app.route("/login")
def login():
    return render_template("login.html")


# 문제를 선택하는 html 필요
@app.route("/test")
def test():
    return render_template("test.html")


@app.route("/review")
def review():
    return render_template("review.html")


@app.route("/question")
def question():
    return render_template("question.html")


@app.route("/submit", methods=["POST"])
def submit():
    code = request.form.get("code")
    file = open("user_code.c", "w")
    file.write(code)
    file.close()

    # 컴파일 명령어
    compile_command = "gcc -o executable user_code.c"

    # 컴파일 실행
    result = subprocess.run(
        compile_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )

    # 컴파일 결과에 따라서 결과 출력
    if result.returncode == 0:
        output = subprocess.run(
            "./executable", stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
        )
        output_str = output.stdout.decode("utf-8")
    else:
        output_str = result.stderr.decode("utf-8")

    return output_str


if __name__ == "__main__":
    app.run("0.0.0.0", debug=True)
