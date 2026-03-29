from fastapi import APIRouter, Depends
from app.schemas.usage_schema import UsageCreate
from app.services.usage_service import UsageService
from app.core.dependencies import require_role

router = APIRouter(prefix="/usage", tags=["Usage"])


# 👉 Admin/System updates usage
@router.post("/update")
async def update_usage(
    data: UsageCreate,
    admin=Depends(require_role("admin"))
):
    return await UsageService.update_usage(data)


# 👉 Customer views usage
@router.get("/{sim_id}")
async def get_usage(
    sim_id: str,
    user=Depends(require_role("customer"))
):
    return await UsageService.get_usage(sim_id, user)