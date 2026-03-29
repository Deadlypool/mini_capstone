from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    MONGO_URI: str = "mongodb://localhost:27017"
    DB_NAME: str = "telecom_db_swayam"
    SECRET_KEY: str = "secret"
    ALGORITHM: str = "HS256"

settings = Settings()