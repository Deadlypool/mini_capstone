from fastapi import APIRouter, Depends
from app.services.admin_service import AdminService
from app.core.dependencies import require_role

router = APIRouter(prefix="/admin", tags=["Admin"])


# 👉 View all users
@router.get("/users")
async def get_users(admin=Depends(require_role("admin"))):
    return await AdminService.get_all_users()


# 👉 Delete user
@router.delete("/users/{user_id}")
async def delete_user(
    user_id: str,
    admin=Depends(require_role("admin"))
):
    return await AdminService.delete_user(user_id)


# 👉 Reports (revenue + usage)
@router.get("/reports")
async def get_reports(admin=Depends(require_role("admin"))):
    return await AdminService.get_reports()