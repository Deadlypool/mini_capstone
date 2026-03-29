from fastapi import APIRouter, Depends
from app.schemas.recharge_schema import RechargeCreate
from app.services.recharge_service import RechargeService
from app.core.dependencies import require_role

router = APIRouter(prefix="/recharge", tags=["Recharge"])


# 👉 Customer recharges SIM
@router.post("/")
async def recharge_sim(
    data: RechargeCreate,
    user=Depends(require_role("customer"))
):
    return await RechargeService.recharge_sim(data, user)


# 👉 Customer views recharge history
@router.get("/history")
async def get_history(user=Depends(require_role("customer"))):
    return await RechargeService.get_recharge_history(user)