from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.guardrail import guardrail_graph
from app.core.langfuse_client import langfuse

router = APIRouter()

class GuardrailRequest(BaseModel):
    roadmap: str

@router.post("/guardrail")
def guardrail(request: GuardrailRequest):
    result = guardrail_graph.invoke({"roadmap": request.roadmap, "risk_level": "", "reasoning": ""})
    langfuse.flush()
    return result