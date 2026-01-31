from fastapi import APIRouter, Depends
from fastapi.responses import RedirectResponse
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
REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI")

# Debug print to see what values are being used
print(f"DEBUG: CLIENT_ID: {CLIENT_ID}")
print(f"DEBUG: REDIRECT_URI: {REDIRECT_URI}")

# GoogleSSO will be initialized per request to ensure fresh environment variables

@router.get("/login")
async def google_login():
    # Initialize GoogleSSO for each request to ensure fresh env vars
    google_sso = GoogleSSO(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    async with google_sso:
        redirect_response = await google_sso.get_login_redirect()
        print(f"DEBUG: Google login redirect URL: {redirect_response.headers.get('location')}")
        return redirect_response

@router.get("/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    # Initialize GoogleSSO for each request to ensure fresh env vars
    google_sso = GoogleSSO(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
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

    frontend_base_url = "http://localhost:5173"
    frontend_url = f"{frontend_base_url}/login-success?token={access_token}&avatar={user.picture}&name={user.display_name}&email={user.email}"
    return RedirectResponse(url=frontend_url)
    