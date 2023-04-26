FROM python:3.9-slim-buster

# 앱을 실행할 작업 디렉토리 설정
WORKDIR /app

# 필요한 라이브러리를 설치하기 위한 'requirements.txt' 파일 복사
COPY requirements.txt .

# 필요한 라이브러리를 설치하기 위한 명령어 실행
RUN pip install -r requirements.txt

# c언어 컴파일러 설치
RUN apt-get update && apt-get install -y gcc

# 앱 코드와 함께 Docker 이미지 내에 복사
COPY . .

# 앱을 실행하기 위한 CMD 명령어 사용
CMD ["python", "server.py"]