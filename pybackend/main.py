from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.algorithm_design import (
    chapter_one
)

app = FastAPI()

origins = [
    # development cs-insight client
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods="*",
    allow_headers="*"
)


app.include_router(
    chapter_one.router
)

@app.get('/')
def read_root():
    return {"message": "CS-Insight says hi!"}