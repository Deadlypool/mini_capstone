from app.core.database import db
from bson import ObjectId

collection = db["recharges"]

class RechargeRepository:

    @staticmethod
    async def create_recharge(data: dict):
        return await collection.insert_one(data)

    @staticmethod
    async def get_recharges_by_sim(sim_id):
        return collection.find({"sim_id": sim_id})