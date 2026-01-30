from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.logo import Logo 
from models.user import User 
from schema.logo import LogoCreate, LogoResponse
from services.gemini import generate_prompt
from services.huggingface import generate_image
from auth import get_current_user

router = APIRouter(prefix="/logo", tags=["Logo"])

@router.get("/")
def get_all_logos(db: Session = Depends(get_db), current_user_email: str = Depends(get_current_user)):
    try:
        user = db.query(User).filter(User.email == current_user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        logos = db.query(Logo).filter(Logo.user_id == user.id).all()
        return logos
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Logo Fetching Failed: {str(e)}")

@router.post("/", response_model=LogoResponse)
def create_logo(
    logo_input: LogoCreate, 
    db: Session = Depends(get_db),
    current_user_email: str = Depends(get_current_user)
):
    try:
        user = db.query(User).filter(User.email == current_user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        prompt = generate_prompt(logo_input.title, logo_input.desc, logo_input.palette, logo_input.design_idea)
        image_base64 = generate_image(prompt)
        
        new_logo = Logo(
            title=logo_input.title, 
            desc=logo_input.desc, 
            palette=logo_input.palette, 
            design_idea=logo_input.design_idea, 
            prompt=prompt, 
            image=image_base64, 
            user_id=user.id 
        )
        
        db.add(new_logo)
        db.commit()
        db.refresh(new_logo)
        return new_logo

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI Generation Failed: {str(e)}")

@router.delete("/{logo_id}") 
def deleteLogo(logo_id: int, db: Session = Depends(get_db), current_user_email: str = Depends(get_current_user)):
    try:
        user = db.query(User).filter(User.email == current_user_email).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        logo = db.query(Logo).filter(Logo.id == logo_id, Logo.user_id == user.id).first()
        if not logo:
            raise HTTPException(status_code=404, detail="Logo not found")
        
        db.delete(logo)
        db.commit()
        return {"message": "Logo deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Logo Deletion Failed: {str(e)}")
