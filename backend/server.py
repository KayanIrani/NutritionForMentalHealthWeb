from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import JSONResponse

app = FastAPI()

class Ques(BaseModel):
    question: str

@app.get('/')
def main():
    return {"data":"Backend Running"}

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