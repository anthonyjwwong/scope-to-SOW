# FastAPI() instance with title and version
# Set docs_url="/docs" //Gives free swagger UI, for testing endpoints without
# frontend.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings


app = FastAPI(
    title="Scope-to-Sow Backend", 
    version="0.1.0",
    docs_url="/docs",
)



# Add CORSMiddleware. Browsers block erquest from localhost:3000 
# to localhost:8000 by default. Need to allowlist frontendURL
# set allow_origins to include both settings.frontend_url and "http://localhost:3000". 
# Allow all methods and headers for now — we'll tighten this for production.
origins = [
    settings.frontend_url,
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Create one endpoint: GET /api/health that returns 
# {"status": "healthy", "version": "0.1.0", "environment": settings.app_env}.
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "0.1.0",
        "environment": settings.app_env,
    }