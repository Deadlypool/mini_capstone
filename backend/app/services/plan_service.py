from app.repositories.plan_repository import PlanRepository
from app.models.plan_model import plan_helper

class PlanService:

    @staticmethod
    async def create_plan(data):
        plan = data.dict()
        await PlanRepository.create_plan(plan)
        return {"message": "Plan created"}

    @staticmethod
    async def get_all_plans():
        plans_cursor = await PlanRepository.get_all_plans()
        plans = []

        async for plan in plans_cursor:
            plans.append(plan_helper(plan))

        return plans

    @staticmethod
    async def update_plan(plan_id: str, data):
        update_data = {k: v for k, v in data.dict().items() if v is not None}
        await PlanRepository.update_plan(plan_id, update_data)
        return {"message": "Plan updated"}

    @staticmethod
    async def delete_plan(plan_id: str):
        await PlanRepository.delete_plan(plan_id)
        return {"message": "Plan deleted"}