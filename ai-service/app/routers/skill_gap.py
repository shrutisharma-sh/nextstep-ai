from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.skill_gap import skill_gap_graph
from app.core.langfuse_client import langfuse

router = APIRouter()

class SkillGapRequest(BaseModel):
    current_skills: str
    target_role: str

@router.post("/skill-gap")
def skill_gap(request: SkillGapRequest):
    result = skill_gap_graph.invoke({
        "current_skills": request.current_skills,
        "target_role": request.target_role,
        "gap_analysis": ""
    })
    langfuse.flush()
    return result