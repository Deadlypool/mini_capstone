from fastapi import APIRouter, Depends
from app.schemas.auth_schema import RegisterRequest, LoginRequest
from app.services.auth_service import AuthService
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

@router.post("/register")
async def register(data: RegisterRequest):
    return await AuthService.register(data)

@router.post("/login")
async def login(data: LoginRequest):
    return await AuthService.login(data)

@router.get("/me")
async def get_me(user=Depends(get_current_user)):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"]
    }