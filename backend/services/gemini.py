from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

def generate_prompt(title: str, desc: str, palette: str, design_idea: str) -> str:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    prompt_text = f"""
    You are an expert AI prompt engineer specializes in creating modern brand identities.
    Create a detailed image prompt for a logo that mimics a high-quality, modern, animated 3D illustration style (like Pixar or modern tech startup branding).
    
    INPUTS:
    - Company Name: {title} (This text MUST be clearly legible and central to the design)
    - Description: {desc}
    - Color Palette: {palette}
    - Style Preference: {design_idea}

    REQUIREMENTS:
    1. The logo must feature the text "{title}" prominently.
    2. The style should be vibrant, modern, and have a slight 3D/animated feel (smooth gradients, soft lighting).
    3. High resolution, vector-style aesthetics.

    Return ONLY the prompt text, no markdown.
    """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt_text
    )
    
    return response.text.strip()