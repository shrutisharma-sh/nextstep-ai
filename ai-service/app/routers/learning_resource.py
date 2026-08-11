from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.learning_resource import learning_resource_graph
from app.core.langfuse_client import langfuse

router = APIRouter()

class LearningResourceRequest(BaseModel):
    skill: str

@router.post("/learning-resource")
def learning_resource(request: LearningResourceRequest):
    result = learning_resource_graph.invoke({"skill": request.skill, "resources": ""})
    langfuse.flush()
    return result