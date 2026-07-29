from typing import TypedDict
from langgraph.graph import StateGraph, END


class PingState(TypedDict):
    message: str


def ping_node(state: PingState) -> PingState:
    return {"message": f"received: {state['message']}"}

graph = StateGraph(PingState)
graph.add_node("ping", ping_node)
graph.set_entry_point("ping")
graph.add_edge("ping", END)

ping_graph = graph.compile()