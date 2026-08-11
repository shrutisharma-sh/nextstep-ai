from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from app.core.config import settings
from langfuse import observe

client = Groq(api_key=settings.groq_api_key)

# Data flowing through: target role + gap analysis in, roadmap out
class RoadmapGeneratorState(TypedDict):
    target_role: str
    gap_analysis: str
    roadmap: str

@observe()
def generate_roadmap(state: RoadmapGeneratorState) -> RoadmapGeneratorState:
    prompt = f"""You are a career coach. Based on the skill gaps below, create a
step-by-step learning roadmap for someone aiming to become a {state['target_role']}.

Break it into clear phases (e.g. Month 1, Month 2, Month 3), and under each phase
list what to learn and why. Keep it practical and realistic.

Skill gaps:
{state['gap_analysis']}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=800,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return {
        "target_role": state["target_role"],
        "gap_analysis": state["gap_analysis"],
        "roadmap": response.choices[0].message.content
    }

graph = StateGraph(RoadmapGeneratorState)
graph.add_node("generate", generate_roadmap)
graph.set_entry_point("generate")
graph.add_edge("generate", END)

roadmap_generator_graph = graph.compile()