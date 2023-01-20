# FastAPI NLP STS

## Prerequisite

- poetry

## Environment & Installation

```
poetry shell
poetry install --no-root
pip install python-multipart
```
### If pytorch-lightning not installed via poetry

```
cd model
pip install -r requirements.txt
```

## How to Run

### Run for Training STS
```
cd model
python train.py
```

### Run for FastAPI STS
```
python main.py
```