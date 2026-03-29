from datetime import datetime
from bson import ObjectId

from app.repositories.usage_repository import UsageRepository
from app.repositories.sim_repository import SIMRepository
from app.models.usage_model import usage_helper


class UsageService:

    @staticmethod
    async def update_usage(data):
        # 👉 Check SIM exists
        sim = await SIMRepository.get_sim_by_id(data.sim_id)
        if not sim:
            raise Exception("SIM not found")

        usage = {
            "sim_id": ObjectId(data.sim_id),
            "data_used": data.data_used,
            "call_minutes": data.call_minutes,
            "sms_count": data.sms_count,
            "date": datetime.utcnow()
        }

        await UsageRepository.create_usage(usage)

        return {"message": "Usage updated"}

    @staticmethod
    async def get_usage(sim_id: str, user):
        # 👉 Check SIM exists
        sim = await SIMRepository.get_sim_by_id(sim_id)
        if not sim:
            raise Exception("SIM not found")

        # 👉 Ensure ownership
        if str(sim["user_id"]) != str(user["_id"]):
            raise Exception("Unauthorized")

        cursor = await UsageRepository.get_usage_by_sim(sim["_id"])

        usage_list = []
        async for usage in cursor:
            usage_list.append(usage_helper(usage))

        return usage_list