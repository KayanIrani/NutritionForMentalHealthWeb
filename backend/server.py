from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def main():
    return {"data":"Backend Running"}