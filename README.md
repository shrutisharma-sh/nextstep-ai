# NextStep AI

An AI career coach I'm building as a portfolio project. You chat with it about your career, and it answers using a mix of an LLM, live web search, and a small set of learning resources I put together. There are also pages for resume analysis, a roadmap, and learning resources.

Guests can send 5 messages without logging in. If you sign up, chat is unlimited and your conversations are saved.

**Where it's at right now:** the backend and AI service work and run together in Docker. I'm in the middle of deploying them (Render for the services, Neon for the database). The frontend works but I still have some pages to finish.

## How it fits together

```
React frontend  ->  Spring Boot backend  ->  FastAPI AI service
                          |                        |
                     Postgres (Neon)        Groq, Tavily, FAISS, Langfuse
```

- The frontend only ever talks to Spring Boot, never to the AI service directly.
- Spring Boot handles login (JWT) and saves everything to the database.
- The AI service doesn't touch the database at all. It just takes a question and returns an answer.

## What I used

- Frontend: React, Vite, Tailwind
- Backend: Spring Boot (Java 21, Maven)
- AI service: FastAPI, LangGraph (Python 3.12)
- LLM: Groq
- Web search: Tavily
- RAG: FAISS + sentence-transformers over a small hardcoded list of resources
- Tracing: Langfuse
- Database: PostgreSQL on Neon
- Docker and Docker Compose

## Folder layout

```
nextstep-ai/
  frontend/
  backend/backend/     Spring Boot app
  ai-service/          FastAPI app
  docker-compose.yml
```

## Running it locally

You need Docker Desktop, a Postgres database (I use Neon), and API keys for Groq, Tavily and Langfuse.

Make two `.env` files.

`backend/backend/.env`:
```
DB_URL=jdbc:postgresql://<host>/<dbname>?sslmode=require
DB_USERNAME=...
DB_PASSWORD=...
AI_SERVICE_URL=http://localhost:8001
```
(plus the JWT secret and admin seed variables the app expects)

`ai-service/.env`:
```
GROQ_API_KEY=...
TAVILY_API_KEY=...
LANGFUSE_SECRET_KEY=...
LANGFUSE_PUBLIC_KEY=...
LANGFUSE_HOST=https://us.cloud.langfuse.com
```


Then from the project root:

```
docker-compose up --build
```

The first build takes a while. Once it's up, you can test the chat endpoint:

```
curl -X POST http://localhost:8080/api/career-planner \
  -H "Content-Type: application/json" \
  -d '{"question": "How do I become a data analyst?"}'
```

Docker Compose sets `AI_SERVICE_URL` to `http://ai-service:8001` for the backend container. Inside Docker, `localhost` points to the container itself, so the services have to call each other by name.

## Main endpoints

- `POST /api/auth/...` for signup and login
- `POST /api/career-planner` for the chat (works for guests too)
- `POST /api/career-insights`
- `GET /api/conversations` for saved chats (needs a login token)

## Deployment plan

- Database: Neon (done)
- AI service and backend: Render, using the Dockerfiles
- Frontend: Vercel

Render's free tier goes to sleep when idle, so the first request after a while can take up to a minute.

## Still to do

- Deploy to Render and Vercel
- Update CORS once the frontend has a real URL
- Set up GitHub Actions for build and lint checks
- Add health checks and some uptime monitoring
- Write a `render.yaml` so the setup is reproducible
- Add rate limiting on the API
- Finish the remaining frontend pages and add a 3D animation to the landing page
- Later, try deploying the same containers on AWS to compare

## Things that broke along the way

Writing these down so I don't forget them:

- DNS on my machine was failing for Neon's hostname. I had changed the DNS setting on the wrong network adapter, and Docker Desktop needed its own DNS setting too.
- Langfuse wanted `LANGFUSE_HOST`, and I had named it something else.
- I got a 403 once because I called the wrong URL, and a 422 because I sent the wrong JSON field name.
- Groq moved the model I was using out of the free tier, and the API returned a 404 until I switched models.
