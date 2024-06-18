from fastapi import FastAPI
from app.controllers import router as read_pessoa

app = FastAPI()

app.include_router(read_pessoa, prefix="/api/v1")