from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from app.core.config import settings
from app.core.faiss_index import search_resources
from langfuse import observe

client = Groq(api_key=settings.groq_api_key)

class LearningResourceState(TypedDict):
    skill: str
    resources: str

@observe()
def suggest_resources(state: LearningResourceState) -> LearningResourceState:
    
    retrieved = search_resources(state["skill"], top_k=3)

    
    retrieved_text = "\n".join(  #convert to plain text 
        f"- {r['title']}: {r['description']}" for r in retrieved
    )

    
    prompt = f"""You are a career coach. A learner wants to study: {state['skill']}

Here are real resources retrieved from our trusted database:
{retrieved_text}

Using ONLY the resources listed above (do not invent new ones), write a short
friendly recommendation explaining which to start with and why.
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=400,
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