from tavily import TavilyClient
from app.core.config import settings

client = TavilyClient(api_key=settings.tavily_api_key)

response = client.search(query="most in-demand tech skills 2026", max_results=3)

for result in response["results"]:
    print(result["title"])
    print(result["url"])
    print(result["content"][:150])
    print("---")
    