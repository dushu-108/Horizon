from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-2.0-flash-exp", contents=f"""
    You are an expert AI prompt engineer.
    Create a highly detailed image prompt for a logo.
    Inputs: {title}, {desc}, {palette}, {design_idea}.
    Include: white background, high quality, vector logo art.
    Return ONLY the prompt text.
    """
)
print(response.text)