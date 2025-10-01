from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import AsyncMongoClient
from bson import ObjectId
import os
from pathlib import Path
from dotenv import load_dotenv
import requests

load_dotenv()

app = FastAPI(debug=True)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

uri = os.getenv('MONGO_URI')
client = AsyncMongoClient(uri)

class Ques(BaseModel):
    question: str

class Blogs(BaseModel):
    timeToRead : str
    blogDate : str
    title : str
    content : str
    author : str

    class Config:
        json_encoders = {
            ObjectId : str
        }

try:
    database = client.get_database("MindfulNutrition")
    blogs = database.get_collection("blogs")
except Exception as e:
    raise Exception("Exception: ", e)

# ==================== PATH RESOLUTION ====================

# Get the absolute path to the project root
BASE_DIR = Path(__file__).resolve().parent.parent  # Go up from backend/ to project root
FRONTEND_DIST = BASE_DIR / "frontend" / "dist"
FRONTEND_ASSETS = FRONTEND_DIST / "assets"
FRONTEND_INDEX = FRONTEND_DIST / "index.html"

print(f"🔍 BASE_DIR: {BASE_DIR}")
print(f"🔍 FRONTEND_DIST: {FRONTEND_DIST}")
print(f"🔍 FRONTEND_DIST exists: {FRONTEND_DIST.exists()}")
print(f"🔍 FRONTEND_INDEX exists: {FRONTEND_INDEX.exists()}")

# ==================== API ROUTES ====================

@app.post('/api/chat')
def chatResponse(body: Ques):
    if body.question.strip() != '':
        res = requests.post('https://kayanirani-chatbotrag.hf.space/chat', json={'question': body.question})
        data = res.json()
        return JSONResponse(
            status_code=200,
            content={"success": True, "data": data['data']}
        )
    else:
        return JSONResponse(
            status_code=400,
            content={"success": False, "data": "Question cannot be empty"}
        )

@app.post('/api/createBlog')
async def getBlog(body: Blogs):
    result = await blogs.insert_one(body.model_dump())
    if result.inserted_id:
        return JSONResponse(
            status_code=200,
            content={"data": "Blog created successfully!"}
        )
    else:
        return JSONResponse(
            status_code=400,
            content={"data": "An error occured while creating the blog"}
        )

@app.get('/api/printBlogs')
async def get_all_blogs():
    cursor = blogs.find()
    blogsList = []
    async for blog in cursor:
        blog['_id'] = str(blog['_id'])
        blogsList.append(blog)
    return JSONResponse(
        status_code=200,
        content={"data": blogsList}
    )

@app.get('/api/Blogs/{id}')
async def get_specific_blog(id: str):
    try:
        blog = await blogs.find_one({"_id": ObjectId(id)})
        if blog:
            blog['_id'] = str(blog['_id'])
            return JSONResponse(
                status_code=200,
                content={"data": blog}
            )
        else:
            return JSONResponse(
                status_code=404,
                content={"data": "blog not found"}
            )
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"data": f"Error: {str(e)}"}
        )

@app.patch('/api/editBlog')
async def editBlog(body: dict):
    result = await blogs.update_one({'_id': ObjectId(body['_id'])}, {'$set': body['setter']})
    if result.matched_count == 0:
        return JSONResponse(
            status_code=400,
            content={"data": "Blog Not Found"}
        )
    else:
        return JSONResponse(
            status_code=200,
            content={"data": "Blog updated successfully!"}
        )

@app.delete('/api/deleteBlog')
async def deleteBlog(body: dict):
    result = await blogs.delete_one({'_id': ObjectId(body['_id'])})
    if result.deleted_count > 0:
        return JSONResponse(
            status_code=200,
            content={"data": "Blog deleted successfully!"}
        )
    else:
        return JSONResponse(
            status_code=400,
            content={"data": "Blog was not found or was not deleted!"}
        )

# ==================== SERVE REACT FRONTEND ====================

# Only serve static files if dist folder exists
if FRONTEND_DIST.exists() and FRONTEND_INDEX.exists():
    print("✅ Serving React frontend from:", FRONTEND_DIST)
    
    # Mount static assets
    if FRONTEND_ASSETS.exists():
        app.mount("/assets", StaticFiles(directory=str(FRONTEND_ASSETS)), name="assets")
    
    # Catch-all route for React Router (MUST BE LAST)
    @app.get("/{full_path:path}")
    async def serve_react_app(full_path: str):
        """Serve React app for all non-API routes"""
        
        # Don't intercept API routes
        if full_path.startswith("api"):
            return JSONResponse(
                status_code=404,
                content={"detail": "Not found"}
            )
        
        # Check if specific file exists
        file_path = FRONTEND_DIST / full_path
        if file_path.is_file():
            return FileResponse(str(file_path))
        
        # Serve index.html for all other routes (React Router)
        return FileResponse(str(FRONTEND_INDEX))
else:
    print("⚠️  WARNING: frontend/dist not found!")
    print("   Run 'npm run build' in the frontend folder")
    
    @app.get("/")
    async def root():
        return JSONResponse(
            status_code=200,
            content={
                "status": "Backend running",
                "message": "Frontend not built. Run 'npm run build' in frontend folder",
                "frontend_dist": str(FRONTEND_DIST),
                "dist_exists": FRONTEND_DIST.exists()
            }
        )