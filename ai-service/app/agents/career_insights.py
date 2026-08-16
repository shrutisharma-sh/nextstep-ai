from pydantic import BaseModel
from typing import List
import json
from groq import Groq
from tavily import TavilyClient
from app.core.config import settings

groq_client = Groq(api_key=settings.groq_api_key)
tavily_client = TavilyClient(api_key=settings.tavily_api_key)


class TopSkill(BaseModel):
    name: str
    percent: int


class TopRole(BaseModel):
    name: str
    description: str


class CareerInsightsRequest(BaseModel):
    role: str


class CareerInsightsResponse(BaseModel):
    role: str
    growth_percent: int
    top_skills: List[TopSkill]
    top_roles: List[TopRole]


def get_career_insights(role: str) -> CareerInsightsResponse:
    
    search_results = tavily_client.search(
        query=f"{role} job market growth in-demand skills 2026",
        max_results=5,
    )

    context = "\n".join(
        result.get("content", "") for result in search_results.get("results", [])
    )

    
    prompt = f"""Based on this research about the "{role}" career, return ONLY valid JSON (no other text, no markdown fences) in exactly this shape:

{{
  "growth_percent": <integer, estimated job growth percentage>,
  "top_skills": [{{"name": "<skill>", "percent": <integer demand score 0-100>}}, ... 5 skills],
  "top_roles": [{{"name": "<related role>", "description": "<one sentence, under 20 words>"}}, ... 4 roles]
}}

Research context:
{context}
"""

    completion = groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )

    raw = completion.choices[0].message.content.strip()
    data = json.loads(raw)

    return CareerInsightsResponse(
        role=role,
        growth_percent=data["growth_percent"],
        top_skills=[TopSkill(**s) for s in data["top_skills"]],
        top_roles=[TopRole(**r) for r in data["top_roles"]],
    )