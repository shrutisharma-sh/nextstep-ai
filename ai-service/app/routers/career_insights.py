from fastapi import APIRouter, HTTPException
from app.agents.career_insights import (
    get_career_insights,
    CareerInsightsRequest,
    CareerInsightsResponse,
)

router = APIRouter()


@router.post("/career-insights", response_model=CareerInsightsResponse)
def career_insights(request: CareerInsightsRequest):
    try:
        return get_career_insights(request.role)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))