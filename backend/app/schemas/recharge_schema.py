from pydantic import BaseModel

class RechargeCreate(BaseModel):
    sim_id: str
    plan_id: str