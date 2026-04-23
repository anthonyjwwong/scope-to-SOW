# a Pydantic BaseSettings class with fields matching your .env.example. 
# Set model_config to read from .env. 
# Give sensible defaults: app_env = "development", 
# frontend_url = "http://localhost:3000", 
# empty strings for the Supabase/Gemini keys (they're not needed yet).
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "development"
    frontend_url: str = "http://localhost:3000"
    supabase_url: str = ""
    supabase_anon_key: str = ""
    supabase_service_role_key: str = ""
    gemini_api_key: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
    )


settings = Settings()