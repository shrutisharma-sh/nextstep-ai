from app.core.faiss_index import search_resources

results = search_resources("I want to learn Docker")
for r in results:
    print(r["title"], "-", r["description"])
    