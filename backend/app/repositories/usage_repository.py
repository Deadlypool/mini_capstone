from app.core.database import db
from bson import ObjectId

collection = db["usage"]

class UsageRepository:

    @staticmethod
    async def create_usage(data: dict):
        return await collection.insert_one(data)

    @staticmethod
    async def get_usage_by_sim(sim_id):
        return collection.find({"sim_id": sim_id})