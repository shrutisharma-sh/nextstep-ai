from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "NextStep AI Service"
    environment: str = "development"
    groq_api_key: str = ""
    tavily_api_key: str = ""
    langfuse_secret_key: str = ""
    langfuse_public_key: str = ""
    LANGFUSE_BASE_URL="https://us.cloud.langfuse.com"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()