from bson import ObjectId
from app.repositories.sim_repository import SIMRepository
from app.models.sim_model import sim_helper

class SIMService:

    @staticmethod
    async def activate_sim(data, agent):
        sim = {
            "mobile_number": data.mobile_number,
            "user_id": ObjectId(data.user_id),
            "status": "active",
            "activated_by": agent["_id"]
        }

        await SIMRepository.create_sim(sim)
        return {"message": "SIM activated"}

    @staticmethod
    async def get_my_sims(user):
        sims_cursor = await SIMRepository.get_sims_by_user(user["_id"])
        sims = []
        async for sim in sims_cursor:
            sims.append(sim_helper(sim))
        return sims

    @staticmethod
    async def suspend_sim(sim_id):
        await SIMRepository.update_sim(sim_id, {"status": "suspended"})
        return {"message": "SIM suspended"}