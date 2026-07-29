from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.groq_api_key)

class CareerPlannerState(TypedDict):
    question: str
    answer: str

def ask_career_question(state: CareerPlannerState) -> CareerPlannerState:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=500,
        messages=[
            {"role": "user", "content": state["question"]}
        ]
    )
    return {"question": state["question"], "answer": response.choices[0].message.content}

graph = StateGraph(CareerPlannerState)
graph.add_node("ask", ask_career_question)
graph.set_entry_point("ask")
graph.add_edge("ask", END)



career_planner_graph = graph.compile()