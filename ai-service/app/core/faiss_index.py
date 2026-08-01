import faiss
from sentence_transformers import SentenceTransformer
from app.core.resource_data import LEARNING_RESOURCES


embedding_model = SentenceTransformer("all-MiniLM-L6-v2")


texts = [f"{item['skill']}: {item['description']}" for item in LEARNING_RESOURCES]
embeddings = embedding_model.encode(texts) #covert to embedding 


dimension = embeddings.shape[1]
index = faiss.IndexFlatL2(dimension) #empty faiss to measure closeness 
index.add(embeddings)


def search_resources(query: str, top_k: int = 3):
    """Given a text query, return the top_k most relevant resources."""
    query_embedding = embedding_model.encode([query])
    distances, indices = index.search(query_embedding, top_k) # find top k closest mathch in embedding 
    results = [LEARNING_RESOURCES[i] for i in indices[0]]
    return results