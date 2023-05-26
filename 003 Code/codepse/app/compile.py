import os
import subprocess


def compile_code(code):
    file = open("user_code.c", "w")
    file.write(code)
    file.close()

    # 컴파일 명령어
    compile_command = "gcc -o executable user_code.c"

    # 컴파일 실행
    result = subprocess.run(
        compile_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
    )

    # 컴파일 결과에 따라 결과 반환
    if result.returncode == 0:
        output = subprocess.run(
            "./executable", stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True
        )
        output_str = output.stdout.decode("utf-8")
    else:
        output_str = result.stderr.decode("utf-8")

    os.remove("user_code.c")  # user_code.c 파일 삭제
    os.remove("executable")  # executable 파일 삭제

    return output_str


def grade_code(output_str, expected_output):
    if output_str.strip() == expected_output:
        return "정답입니다!"  # 정답인 경우
    else:
        return "오답입니다! ( ✋˙࿁˙ )"  # 오답인 경우
