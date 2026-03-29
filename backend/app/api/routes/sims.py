from fastapi import APIRouter, Depends
from app.schemas.sim_schema import SIMCreate
from app.services.sim_service import SIMService
from app.core.dependencies import require_role, get_current_user

router = APIRouter(prefix="/sims", tags=["SIMs"])


# 👉 Agent activates SIM
@router.post("/")
async def activate_sim(
    data: SIMCreate,
    agent=Depends(require_role("agent"))
):
    return await SIMService.activate_sim(data, agent)


# 👉 Customer views their SIMs
@router.get("/my")
async def get_my_sims(user=Depends(require_role("customer"))):
    return await SIMService.get_my_sims(user)


# 👉 Admin suspends SIM
@router.put("/{sim_id}")
async def suspend_sim(
    sim_id: str,
    admin=Depends(require_role("admin"))
):
    return await SIMService.suspend_sim(sim_id)