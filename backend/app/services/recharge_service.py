from datetime import datetime
from bson import ObjectId

from app.repositories.recharge_repository import RechargeRepository
from app.repositories.sim_repository import SIMRepository
from app.repositories.plan_repository import PlanRepository
from app.models.recharge_model import recharge_helper


class RechargeService:

    @staticmethod
    async def recharge_sim(data, user):
        # 👉 Check SIM exists
        sim = await SIMRepository.get_sim_by_id(data.sim_id)
        if not sim:
            raise Exception("SIM not found")

        # 👉 Ensure user owns this SIM
        if str(sim["user_id"]) != str(user["_id"]):
            raise Exception("Unauthorized SIM")

        # 👉 Get plan
        plan = await PlanRepository.get_plan_by_id(data.plan_id)
        if not plan:
            raise Exception("Plan not found")

        recharge = {
            "sim_id": ObjectId(data.sim_id),
            "plan_id": ObjectId(data.plan_id),
            "amount": plan["price"],
            "status": "success",
            "recharged_at": datetime.utcnow()
        }

        await RechargeRepository.create_recharge(recharge)

        return {"message": "Recharge successful"}

    @staticmethod
    async def get_recharge_history(user):
        sims_cursor = await SIMRepository.get_sims_by_user(user["_id"])

        sim_ids = []
        async for sim in sims_cursor:
            sim_ids.append(sim["_id"])

        recharges = []
        for sim_id in sim_ids:
            cursor = await RechargeRepository.get_recharges_by_sim(sim_id)
            async for recharge in cursor:
                recharges.append(recharge_helper(recharge))

        return recharges