from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.resume_analysis import resume_analysis_graph

router = APIRouter()

class ResumeAnalysisRequest(BaseModel):
    resume_text: str

@router.post("/resume-analysis")
def resume_analysis(request: ResumeAnalysisRequest):
    result = resume_analysis_graph.invoke({"resume_text": request.resume_text, "feedback": ""})
    return result