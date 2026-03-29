from pydantic import BaseModel

class PlanCreate(BaseModel):
    name: str
    price: int
    validity_days: int
    data_limit: str
    calls: str

class PlanUpdate(BaseModel):
    name: str | None = None
    price: int | None = None
    validity_days: int | None = None
    data_limit: str | None = None
    calls: str | None = None