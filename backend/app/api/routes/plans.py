from fastapi import APIRouter, Depends
from app.schemas.plan_schema import PlanCreate, PlanUpdate
from app.services.plan_service import PlanService
from app.core.dependencies import require_role

router = APIRouter(prefix="/plans", tags=["Plans"])


# Public: view all plans
@router.get("/")
async def get_plans():
    return await PlanService.get_all_plans()


# Admin: create plan
@router.post("/")
async def create_plan(
    data: PlanCreate,
    admin=Depends(require_role("admin"))
):
    return await PlanService.create_plan(data)


# Admin: update plan
@router.put("/{plan_id}")
async def update_plan(
    plan_id: str,
    data: PlanUpdate,
    admin=Depends(require_role("admin"))
):
    return await PlanService.update_plan(plan_id, data)


# Admin: delete plan
@router.delete("/{plan_id}")
async def delete_plan(
    plan_id: str,
    admin=Depends(require_role("admin"))
):
    return await PlanService.delete_plan(plan_id)