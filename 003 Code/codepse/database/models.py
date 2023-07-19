from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class QList(Base):
    __tablename__ = "q_list"

    q_level = Column(String, nullable=False)
    q_id = Column(Integer, primary_key=True, nullable=False)
    q_name = Column(String, nullable=False)
    q_content = Column(Text, nullable=False)
    ex_print = Column(Text, nullable=False)
    c_answer_code = Column(Text, nullable=False)
    cpp_answer_code = Column(Text, nullable=False)
    p_answer_code = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)


class TypingGame(Base):
    __tablename__ = "typinggame"

    id = Column(Integer, primary_key=True)
    code = Column(Text, nullable=True)
    language = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
