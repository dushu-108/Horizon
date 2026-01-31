from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class LoginResponse(BaseModel):
    access_token: str
    token_type: str
    user: "UserResponse"

class UserBase(BaseModel):
    email: EmailStr
    name: str
    avatar: Optional[str] = "https://apa.lk/wp-content/uploads/2022/05/1024px-User-avatar.svg_.png"

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str
    avatar: Optional[str] = "https://apa.lk/wp-content/uploads/2022/05/1024px-User-avatar.svg_.png"
class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    password: Optional[str] = None
    avatar: Optional[str] = None

class UserResponse(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)

