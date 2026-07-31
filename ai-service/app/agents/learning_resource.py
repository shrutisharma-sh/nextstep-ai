from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from app.core.config import settings

client = Groq(api_key=settings.groq_api_key)


class LearningResourceState(TypedDict):
    skill: str
    resources: str

def suggest_resources(state: LearningResourceState) -> LearningResourceState:
    prompt = f"""You are a career coach. Suggest 3-5 good learning resources
(courses, docs, books, or free tutorials) for someone learning: {state['skill']}

For each resource, briefly say why it's useful and roughly how long it takes.
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=600,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return {"skill": state["skill"], "resources": response.choices[0].message.content}

graph = StateGraph(LearningResourceState)
graph.add_node("suggest", suggest_resources)
graph.set_entry_point("suggest")
graph.add_edge("suggest", END)

learning_resource_graph = graph.compile()