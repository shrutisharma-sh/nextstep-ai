from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.roadmap_generator import roadmap_generator_graph

router = APIRouter()

class RoadmapGeneratorRequest(BaseModel):
    target_role: str
    gap_analysis: str

@router.post("/roadmap-generator")
def roadmap_generator(request: RoadmapGeneratorRequest):
    result = roadmap_generator_graph.invoke({
        "target_role": request.target_role,
        "gap_analysis": request.gap_analysis,
        "roadmap": ""
    })
    return result