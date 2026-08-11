from typing import TypedDict
from langgraph.graph import StateGraph, END
from groq import Groq
from tavily import TavilyClient
from app.core.config import settings
from langfuse import observe


client = Groq(api_key=settings.groq_api_key)
tavily_client = TavilyClient(api_key=settings.tavily_api_key)

print("TAVILY KEY LOADED:", repr(settings.tavily_api_key))

class CareerPlannerState(TypedDict):
    question: str
    answer: str



@observe()
def ask_career_question(state: CareerPlannerState) -> CareerPlannerState:
    
    search_results = tavily_client.search(query=state["question"], max_results=3)

   
    context_text = "\n".join(
        f"- {r['title']}: {r['content'][:200]}"
        for r in search_results["results"]
    )

    
    prompt = f"""You are a career coach. Use the current web information below
to help answer the question accurately. If the web info isn't directly relevant,
rely on your general knowledge instead.

Current web information:
{context_text}

Question: {state['question']}
"""
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        max_tokens=500,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    return {"question": state["question"], "answer": response.choices[0].message.content}

graph = StateGraph(CareerPlannerState)
graph.add_node("ask", ask_career_question)
graph.set_entry_point("ask")
graph.add_edge("ask", END)

career_planner_graph = graph.compile()