from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

def generate_prompt(title: str, desc: str, palette: str, design_idea: str) -> str:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    prompt_text = f"""
    You are an expert AI prompt engineer.
    Create a highly detailed image prompt for a logo.
    Inputs: Title: {title}, Description: {desc}, Color Palette: {palette}, Design Idea: {design_idea}.
    Include: white background, high quality, vector logo art, minimalist.
    Return ONLY the prompt text, no markdown code blocks.
    """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt_text
    )
    
    return response.text.strip()