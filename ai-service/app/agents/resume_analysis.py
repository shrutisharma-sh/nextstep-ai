from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.groq_api_key)

# Data flowing through this flowchart: resume text in, feedback out
class ResumeAnalysisState(TypedDict):
    resume_text: str
    feedback: str

def analyze_resume(state: ResumeAnalysisState) -> ResumeAnalysisState:
    prompt = f"""You are a career coach reviewing a resume.
Give clear, actionable feedback on strengths and weaknesses.

Resume:
{state['resume_text']}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=600,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return {"resume_text": state["resume_text"], "feedback": response.choices[0].message.content}

graph = StateGraph(ResumeAnalysisState)
graph.add_node("analyze", analyze_resume)
graph.set_entry_point("analyze")
graph.add_edge("analyze", END)

resume_analysis_graph = graph.compile()