from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pymongo import AsyncMongoClient
from bson import ObjectId
import os
from dotenv import load_dotenv
load_dotenv()

app = FastAPI(debug=True)
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

# class BlogsResponse(BaseModel):
#     _id : str
#     timeToRead : str
#     blogDate : str
#     title : str
#     content : str
#     author : str


try:
    database = client.get_database("MindfulNutrition")
    blogs = database.get_collection("blogs")
except Exception as e:
    raise Exception("Exception: ",e)


@app.get('/')
def index():
    return JSONResponse(
        status_code=200,
        content={
            "data":"server is running"
        }
    )
    # return {"data": "server is running"}

# RAG
@app.post('/api/chat')
def chatResponse(body:Ques):
    if body.question.strip() != '':
        # LLM RAG code here 
        return JSONResponse(
            status_code=200,
            content={"success":True,"data":f"The answer to your question is {body.question}"}
        )
    else:
        return JSONResponse(
            status_code=400,
            content={"success":False,"data":"Question cannot be empty"}
        )


# Blogs
@app.post('/api/createBlog')
async def getBlog(body:Blogs):


    result = await blogs.insert_one(body.model_dump())

    # return {"data":body.model_dump()}
    if result.inserted_id:
        return JSONResponse(
            status_code=200,
            content={
                "data":"Blog created successfully!"
            }
        )
    else:
        return JSONResponse(
            status_code=400,
            content={
                "data":"An error occured while creating the blog"
            }
        )


# Testing Purposes
# @app.get('/api/userInput/{name}')
# async def getBlog2(name:str):
#     blog = Blogs(
#         timeToRead="2 mins",
#         blogDate="22/09/2025",
#         title="Mental Health Foods",
#         content="Blah blah blah",
#         author=name
#     )

#     await blogs.insert_one(blog.model_dump())

#     return {"data":blog.model_dump()}

@app.get('/api/printBlogs')
async def get_all_blogs():
    cursor = blogs.find()
    blogsList = []
    async for blog in cursor:
        # print(type(blog))
        blog['_id'] = str(blog['_id'])
        # blog_dict = BlogsResponse(**blog)
        blogsList.append(blog)

    # return {'data':blogsList}
    return JSONResponse(
        status_code=200,
        content={
            "data":blogsList
        }
    )

@app.get('/api/Blogs/{id}')
async def get_specific_blog(id:str):
    try:
        blog = blogs.find_one({"_id": ObjectId(id)})
        blog['_id'] = str(blog['_id'])
        return JSONResponse(
            status_code=200,
            content={
                "data": blog
                }
            )

    except:
        return JSONResponse(
            status_code=200,
            content={
                "data": "blog not found"
                }
            )
        



@app.patch('/api/editBlog')
# Json
# {'query':{'_id':'whtv'},'setter':{multiple or single updating jsons}}
async def editBlog(body):
    result = await blogs.update_one(body['query'],{'$set': body['setter']})
    if result.matched_count == 0:
        return JSONResponse(
            status_code=400,
            content={
                "data": "Blog Not Found"
            }
        )
    else:
        return JSONResponse(
            status_code=200,
            content={
                "data": "Blog updated successfully!"
            }
        )


@app.delete('/api/deleteBlog')
async def deleteBlog(body):
    result = await blogs.delete_one(body)
    if result.deleted_count>0:
        return JSONResponse(
            status_code=200,
            content={
                "data": "Blog deleted successfully!"
            }
        )
    else:
        return JSONResponse(
            status_code=400,
            content={
                "data": "Blog was not found or deleted!"
            }
        )



    




# docs
# https://pymongo.readthedocs.io/en/stable/api/pymongo/operations.html
# https://www.mongodb.com/docs/languages/python/pymongo-driver/v4.14/get-started/