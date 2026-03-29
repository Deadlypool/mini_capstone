from pydantic import BaseModel

class SIMCreate(BaseModel):
    mobile_number: str
    user_id: str

class SIMResponse(BaseModel):
    id: str
    mobile_number: str
    status: str