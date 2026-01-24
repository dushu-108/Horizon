from fastapi import APIRouter, Depends, RedirectResponse
from starlette.requests import Request
from fastapi_sso.sso.google import GoogleSSO
import os
from dotenv import load_dotenv
from auth import createAccessToken
from models.user import User
from sqlalchemy.orm import Session
from database import get_db

load_dotenv()

router = APIRouter(
    prefix="/auth/google",
    tags=["Authentication"]
)

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

google_sso = GoogleSSO(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

@router.get("/login")
async def google_login():
    async with google_sso:
        return await google_sso.get_login_redirect()

@router.get("/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    async with google_sso:
        user = await google_sso.verify_and_process(request)
    
    existing_user = db.query(User).filter(User.email == user.email).first()
    
    if not existing_user:
        new_user = User(
            email=user.email, 
            name=user.display_name, 
            avatar=user.picture,
            password=None
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
    
    access_token = createAccessToken({"sub": user.email})

    frontend_url = f"http://localhost:5173/login-success?token={access_token}"
    return RedirectResponse(url=frontend_url)