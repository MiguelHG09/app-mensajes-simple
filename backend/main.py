from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI(title="App Mensajes Simple")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Mensaje(BaseModel):
    texto: str

@app.get("/")
def estado_servidor():
    return {"status": "ok", "mensaje": "Servidor backend activo."}

@app.post("/enviar-mensaje")
def guardar_mensaje(mensaje: Mensaje):
    with open("mensajes.txt", "a", encoding="utf-8") as archivo:
        hora_actual = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        archivo.write(f"[{hora_actual}] {mensaje.texto}\n")
    
    print(f"--> Nuevo mensaje recibido: {mensaje.texto}")
    return {"status": "éxito", "confirmacion": "Mensaje guardado"}