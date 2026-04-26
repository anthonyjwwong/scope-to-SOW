
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.auth import get_current_user


app = FastAPI(
    title="Scope-to-Sow Backend", 
    version="0.1.0",
    docs_url="/docs",
)

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



@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "version": "0.1.0",
        "environment": settings.app_env,
    }

@app.get("/api/me")
async def get_me(user: dict = Depends(get_current_user)):
    return {"user_id": user["id"], "email": user["email"]}