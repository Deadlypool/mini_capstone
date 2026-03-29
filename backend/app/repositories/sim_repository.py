from app.core.database import db

collection = db["sims"]

class SIMRepository:

    @staticmethod
    async def create_sim(sim: dict):
        return await collection.insert_one(sim)

    @staticmethod
    async def get_sims_by_user(user_id):
        return collection.find({"user_id": user_id})

    @staticmethod
    async def get_sim_by_id(sim_id):
        from bson import ObjectId
        return await collection.find_one({"_id": ObjectId(sim_id)})

    @staticmethod
    async def update_sim(sim_id, update_data):
        from bson import ObjectId
        return await collection.update_one(
            {"_id": ObjectId(sim_id)},
            {"$set": update_data}
        )