from utils.db import db

class Reporte(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    asunto = db.Column(db.String(255))
    mensaje = db.Column(db.String(255))
    prioridad = db.Column(db.String(255))
    categoría = db.Column(db.String(255))
    usuario = db.Column(db.String(255))

    def __init__(self, asunto, mensaje, prioridad, usuario):
        self.asunto = asunto
        self.mensaje = mensaje
        self.prioridad = prioridad
        self.categoría = "Finanzas"
        self.usuario = usuario

