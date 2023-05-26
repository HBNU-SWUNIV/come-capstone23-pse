from sqlalchemy import create_engine

# from sqlalchemy.exc import OperationalError
from app.config import Config
from sqlalchemy.orm import sessionmaker


def get_db_connection():
    db_url = Config.DB_URL

    # create_engine 함수로 데이터베이스에 연결
    engine = create_engine(db_url)

    # 세션 팩토리 생성
    Session = sessionmaker(bind=engine)

    # 세션 생성
    session = Session()

    # 연결 테스트
    # try:
    #     session.execute(text("SELECT 1"))
    #     print("MySQL database connected")
    # except OperationalError:
    #     print("MySQL database not connected")

    return session
