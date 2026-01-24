from fastapi import FastAPI
from database import engine
from models import Base
from routes import auth_router, google_auth_router

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(google_auth_router)


