from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from models import user, logo
from routes import auth, googleAuth, logo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(googleAuth.router)
app.include_router(logo.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Horizon API"}

