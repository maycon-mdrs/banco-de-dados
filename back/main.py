from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.pessoa_controller import router as read_pessoa
from app.controllers.veiculo_controller import router as read_veiculo
from app.controllers.categoria_controller import router as read_categoria
from app.controllers.reserva_controller import router as read_reserva
from app.controllers.preco_controller import router as read_preco

app = FastAPI()

# Lista de origens permitidas
origins = [
    "http://localhost:5173",  # Adicione as origens que você deseja permitir
    "http://127.0.0.1:5173",
    # Adicione mais origens conforme necessário
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos os métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permitir todos os cabeçalhos
)

app.include_router(read_pessoa, prefix="/api/v1")
app.include_router(read_veiculo, prefix="/api/v1")
app.include_router(read_categoria, prefix="/api/v1")
app.include_router(read_reserva, prefix="/api/v1")
