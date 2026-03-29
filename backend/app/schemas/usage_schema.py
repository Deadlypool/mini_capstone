from pydantic import BaseModel
from datetime import datetime

class UsageCreate(BaseModel):
    sim_id: str
    data_used: int
    call_minutes: int
    sms_count: int