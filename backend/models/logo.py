from database import Base
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

class Logo(Base):
    __tablename__ = "logo"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    desc = Column(String)
    palette = Column(String)
    design_idea = Column(String)
    prompt = Column(String)
    image = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="logos")
