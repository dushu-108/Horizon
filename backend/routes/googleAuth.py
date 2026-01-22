from fastapi import APIRouter, HTTPException
from starlette.requests import Request
from fastapi_sso.sso.google import GoogleSSO
import os
from dotenv import load_dotenv
from auth import createAccessToken

load_dotenv()

router = APIRouter()

CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

google_sso = GoogleSSO(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)

@router.get("/login")
async def google_login():
    async with google_sso:
        return await google_sso.get_login_redirect()

@router.get("/callback")
async def google_callback(request: Request):
    async with google_sso:
        user = await google_sso.verify_and_process(request)
    if user.email not in users_db:
        users_db[user.email] = {
            "email": user.email,
            "password_hash": None,
            "avatar": user.avatar,
            "provider": "google"
        }
    
    return {"access_token": createAccessToken({"sub": user.email})}