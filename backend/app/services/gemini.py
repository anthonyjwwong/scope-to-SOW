from google import genai
from google.genai import types
from app.config import settings
from app.schemas.extraction import ExtractionResult
from app.prompts.extraction import EXTRACTION_SYSTEM_PROMPT

client = genai.Client(api_key=settings.gemini_api_key)

PROMPT_VERSION = "extraction-v1"   # bump on every prompt change
MODEL = "gemini-2.5-flash"

def extract(transcript: str) -> ExtractionResult:
    response = client.models.generate_content(
        model=MODEL,
        contents=transcript,
        config=types.GenerateContentConfig(
            system_instruction=EXTRACTION_SYSTEM_PROMPT,
            response_mime_type="application/json",
            response_schema=ExtractionResult,
            temperature=0.0
        )
    )
    if response.parsed is None:
        # If the SDK could not parse response into schema,
        # Manually validate with pydantic
        return ExtractionResult.model_validate_json(response.text)
    return response.parsed
