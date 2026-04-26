from fastapi import Depends, HTTPException, Request
from supabase import create_client
from app.config import settings
async def get_current_user(request:Request) -> dict:

    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing auth token")
    
    token = auth_header.split(" ")[1]
    supabase = create_client(settings.supabase_url, settings.supabase_service_role_key)


    try:
        user = supabase.auth.get_user(token)
        return {"id": user.user.id, "email": user.user.email}
    except Exception as e:
        print(f"Auth error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")