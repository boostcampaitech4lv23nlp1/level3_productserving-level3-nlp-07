import torch
import pytorch_lightning as pl

import transformers
from model.inference import Dataloader, Model, Dataset
from fastapi import FastAPI, Form, Request
from fastapi.templating import Jinja2Templates
import uvicorn 

model = torch.load('./model/model.pt')
model_name = 'klue/roberta-small'
tokenizer = transformers.AutoTokenizer.from_pretrained(model_name, max_length=160)

app = FastAPI()
templates = Jinja2Templates(directory='./')

@app.get("/")
def read_root():
    return "STS 서비스를 이용하고자 한다면 주소창에 /sts를 입력하세요."

@app.get("/sts/")
def get_input_form(request: Request):
    return templates.TemplateResponse('input_form.html', context={'request':request})

@app.post("/sts/")
def inference(sentence1: str = Form(...), sentence2: str = Form(...)):
    model.eval()
    text = sentence1 + ' [SEP] ' + sentence2
    data = tokenizer(text,add_special_tokens=True, padding='max_length', truncation=True, return_tensors='pt')['input_ids']
    with torch.no_grad():
        pred = model(data)
        result = round(float(pred),1)
    return f"{sentence1}과 {sentence2}의 문장 간 유사도는 {result}입니다."

if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=8000)