from fastapi import APIRouter, Depends, HTTPException
from schema.user import Token, UserCreate, UserLogin, UserResponse, LoginResponse, UserUpdate
from auth import createAccessToken, verifyPassword, hashPassword, get_current_user
from models.user import User
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter(
    prefix = "/auth",
    tags = ["Authentication"]
)

@router.post("/login", response_model=LoginResponse)
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verifyPassword(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    
    access_token = createAccessToken(data={"sub": db_user.email})
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": db_user
    }

@router.post("/register", response_model=UserResponse)
def register(user : UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    hashed_password = hashPassword(user.password)
    avatar_url = user.avatar or "https://cdn-icons-png.flaticon.com/512/3003/3003035.png"
    new_user = User(email=user.email, name=user.name, avatar=avatar_url, password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.put("/update", response_model=UserResponse)
def update_user(
    user_update: UserUpdate, 
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):
    db_user = db.query(User).filter(User.email == current_user_email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user_update.name is not None:
        db_user.name = user_update.name
    
    if user_update.avatar is not None:
        db_user.avatar = user_update.avatar
    
    if user_update.password is not None:
        db_user.password = hashPassword(user_update.password)
    

    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/delete", response_model=UserResponse)
def delete_user(
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):
    db_user = db.query(User).filter(User.email == current_user_email).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return db_user
    