from fastapi import FastAPI

from app.core.config import settings
from app.routers import health , ping, career_planner ,resume_analysis

app = FastAPI(title=settings.app_name)

app.include_router(health.router)
app.include_router(ping.router)
app.include_router(career_planner.router)
app.include_router(resume_analysis.router)