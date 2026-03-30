from app.repositories.user_repository import UserRepository
from app.core.security import hash_password, verify_password, create_access_token
from fastapi import HTTPException

class AuthService:

    @staticmethod
    async def register(data):
        existing = await UserRepository.get_by_email(data.email)
        if existing:
            raise Exception("User already exists")

        user = {
            "name": data.name,
            "email": data.email,
            "password": hash_password(data.password),
            "role": "customer",
            "is_active": True
        }

        await UserRepository.create_user(user)
        return {"message": "User created"}

    @staticmethod
    async def login(data):
        user = await UserRepository.get_by_email(data.email)

        if not user or not verify_password(data.password, user["password"]):
            raise HTTPException(status_code=401, detail="Invalid credentials")

        token = create_access_token({
            "user_id": str(user["_id"]),
            "role": user["role"]
        })

        return {"access_token": token}