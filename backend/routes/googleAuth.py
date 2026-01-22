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
    
    if not user:
        raise HTTPException(status_code=400, detail="Failed to login with Google")
    access_token = createAccessToken(data={"sub": user.email})
    
    return {"access_token": access_token, "token_type": "bearer"}

