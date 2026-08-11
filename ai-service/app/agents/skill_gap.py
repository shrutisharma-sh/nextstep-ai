from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from app.core.config import settings
from langfuse import observe

client = Groq(api_key=settings.groq_api_key)


class SkillGapState(TypedDict):
    current_skills: str
    target_role: str
    gap_analysis: str

@observe()
def analyze_skill_gap(state: SkillGapState) -> SkillGapState:
    prompt = f"""You are a career coach. Compare the person's current skills
against what's typically required for their target role. List the missing
or weak skills clearly, and briefly explain why each matters.

Current skills:
{state['current_skills']}

Target role:
{state['target_role']}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=600,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return {
        "current_skills": state["current_skills"],
        "target_role": state["target_role"],
        "gap_analysis": response.choices[0].message.content
    }

graph = StateGraph(SkillGapState)
graph.add_node("analyze", analyze_skill_gap)
graph.set_entry_point("analyze")
graph.add_edge("analyze", END)

skill_gap_graph = graph.compile()