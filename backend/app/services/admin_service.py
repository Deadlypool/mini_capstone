from app.core.database import db
from app.models.recharge_model import recharge_helper
from app.models.usage_model import usage_helper


class AdminService:

    @staticmethod
    async def get_all_users():
        users_cursor = db["users"].find()
        users = []

        async for user in users_cursor:
            users.append({
                "id": str(user["_id"]),
                "name": user["name"],
                "email": user["email"],
                "role": user["role"]
            })

        return users

    @staticmethod
    async def delete_user(user_id: str):
        from bson import ObjectId

        await db["users"].delete_one({"_id": ObjectId(user_id)})
        return {"message": "User deleted"}

    @staticmethod
    async def get_reports():
        # 👉 Revenue = sum of all successful recharges
        revenue = 0
        recharge_cursor = db["recharges"].find()

        async for recharge in recharge_cursor:
            if recharge["status"] == "success":
                revenue += recharge["amount"]

        # 👉 Total usage stats
        total_data = 0
        total_calls = 0
        total_sms = 0

        usage_cursor = db["usage"].find()

        async for usage in usage_cursor:
            total_data += usage["data_used"]
            total_calls += usage["call_minutes"]
            total_sms += usage["sms_count"]

        return {
            "total_revenue": revenue,
            "total_data_used": total_data,
            "total_call_minutes": total_calls,
            "total_sms": total_sms
        }