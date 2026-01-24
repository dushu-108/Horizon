from sqlalchemy import Integer, String, Column
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    email = Column(String, unique=True)
    password = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    logos = relationship("Logo", back_populates="user")