from app.core.database import db

collection = db["users"]

class UserRepository:

    @staticmethod
    async def create_user(user: dict):
        return await collection.insert_one(user)

    @staticmethod
    async def get_by_email(email: str):
        return await collection.find_one({"email": email})