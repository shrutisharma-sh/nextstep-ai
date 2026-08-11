from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.career_planner import career_planner_graph
from app.core.langfuse_client import langfuse

router = APIRouter()

class CareerPlannerRequest(BaseModel):
    question: str

@router.post("/career-planner")
def career_planner(request: CareerPlannerRequest):
    result = career_planner_graph.invoke({"question": request.question, "answer": ""})
    langfuse.flush() 
    return result