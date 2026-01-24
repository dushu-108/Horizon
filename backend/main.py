from fastapi import FastAPI
from database import engine, Base
from models import user, logo
from routes import auth, googleAuth, logo

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(googleAuth.router)
app.include_router(logo.router)

@app.get("/")
def root():
    return {"message": "Welcome to the Horizon API"}

