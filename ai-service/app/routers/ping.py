from fastapi import APIRouter
from pydantic import BaseModel
from app.agents.ping_graph import ping_graph

router = APIRouter()


class PingRequest(BaseModel):
    message: str

@router.post("/ping")
def ping(request: PingRequest):
    result = ping_graph.invoke({"message": request.message})
    return result