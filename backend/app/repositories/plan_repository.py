from app.core.database import db
from bson import ObjectId

collection = db["plans"]

class PlanRepository:

    @staticmethod
    async def create_plan(plan: dict):
        return await collection.insert_one(plan)

    @staticmethod
    async def get_all_plans():
        return collection.find()

    @staticmethod
    async def get_plan_by_id(plan_id: str):
        return await collection.find_one({"_id": ObjectId(plan_id)})

    @staticmethod
    async def update_plan(plan_id: str, update_data: dict):
        return await collection.update_one(
            {"_id": ObjectId(plan_id)},
            {"$set": update_data}
        )

    @staticmethod
    async def delete_plan(plan_id: str):
        return await collection.delete_one({"_id": ObjectId(plan_id)})