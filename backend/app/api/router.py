from fastapi import APIRouter
from app.api.routes import auth
from app.api.routes import sims
from app.api.routes import plans
from app.api.routes import recharge
from app.api.routes import usage
from app.api.routes import admin

router = APIRouter()

router.include_router(auth.router)
router.include_router(sims.router)
router.include_router(plans.router)
router.include_router(recharge.router)
router.include_router(usage.router)
router.include_router(admin.router)