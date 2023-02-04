from fastapi import FastAPI, Response, Request
from starlette.responses import JSONResponse
from xml.etree import ElementTree
import uvicorn
import json
from pydantic import BaseModel, Field
from typing import Optional,List
from starlette.middleware.cors import CORSMiddleware
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class User(BaseModel):
    user_id : Optional[str] = None
    password : Optional[str] = None

class DtsInput(BaseModel):
    chat_room : str
    start_date : str ## or datetime, 아마 string일 듯
    time_period : str
    penalty : List[str]

class SummaryInput(BaseModel):
    start: str
    due: str
    content: str
    dialogue: List[str]

@app.post("/answer")
async def answer(dd: User,response : JSONResponse):
    data = dd
    answer = data.answer
    response = JSONResponse({"answer": answer})
    return response

if __name__ =='__main__':
    uvicorn.run(app)