import requests
import base64
import os
from dotenv import load_dotenv

load_dotenv()

HF_TOKEN = os.getenv("HUGGING_FACE_TOKEN") 
API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-Krea-dev"

def generate_image(prompt: str):
    headers = {"Authorization": f"Bearer {HF_TOKEN}"}
    
    response = requests.post(API_URL, headers=headers, json={"inputs": prompt})  
    image_bytes = response.content   
    base64_img = base64.b64encode(image_bytes).decode('utf-8')
    
    return f"data:image/jpeg;base64,{base64_img}"
