from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

def generate_prompt(title: str, desc: str, palette: str, design_idea: str) -> str:
    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    
    prompt_text = f"""
    You are an expert AI prompt engineer specializing in dynamic, cartoon-style vector art and mascot logos.
    Create a detailed image prompt for a logo that mimics a bold, high-quality vector illustration style.
    
    INPUTS:
    - Company Name: {title} (The text "{title}" MUST be the central focus, bold, and heavily stylized)
    - Description: {desc}
    - Color Palette: {palette}
    - Style Preference: {design_idea}

    REQUIREMENTS:
    1. ART STYLE: Modern Cartoon Vector. equivalent to high-end Esports or Sports mascots only in terms of ART TECHNIQUE.
    2. KEY VISUALS: THICK bold outlines (black/dark), hard cel-shading (no soft blur), flat 2D vector look, highly vibrant colors.
    3. COMPOSITION: Dynamic, aggressive or playful (depending on description), but always crisp and clean.
    4. NO photorealism, NO soft 3D rendering, NO complex gradients. It must look like a high-quality Adobe Illustrator vector export.

    Return ONLY the prompt text, no markdown.
    """
    
    response = client.models.generate_content(
        model="gemini-2.5-flash", 
        contents=prompt_text
    )
    
    return response.text.strip()