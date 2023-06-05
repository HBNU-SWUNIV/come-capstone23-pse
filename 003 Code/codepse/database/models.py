from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class QList(Base):
    __tablename__ = "q_list"

    q_lang = Column(String, nullable=False)
    q_id = Column(Integer, primary_key=True, nullable=False)
    q_name = Column(String, nullable=False)
    q_content = Column(Text, nullable=False)
    ex_print = Column(Text, nullable=False)
    answer_code = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
