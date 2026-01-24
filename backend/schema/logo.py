from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime
from schema.user import UserResponse

class LogoBase(BaseModel):
    title: str
    desc: str
    palette: str
    design_idea: str

class LogoCreate(LogoBase):
    pass

class LogoResponse(LogoBase):
    id: int
    prompt: Optional[str] = None
    image: Optional[str] = None
    created_at: datetime
    user_id: int

    model_config = ConfigDict(from_attributes=True)


class UserWithLogos(UserResponse):
    logos: List[LogoResponse] = []

    model_config = ConfigDict(from_attributes=True)