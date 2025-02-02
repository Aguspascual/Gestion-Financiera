from utils.db import db

class Ingreso(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    categoria = db.Column(db.String(255))
    idUsuario = db.Column(db.Integer)
    descripcion = db.Column(db.String(255))
    fechaYhora = db.Column(db.DateTime)
    importe = db.Column(db.Float)

    def __init__(self, categoria, idUsuario, descripcion,  fechaYhora, importe):
        self.categoria = categoria
        self.idUsuario = idUsuario
        self.descripcion = descripcion
        self.fechaYhora = fechaYhora
        self.importe = importe


    def historial(self, idUsuario):
        ingresos = Ingreso.query.filter_by(idUsuario=idUsuario).all()
        return ingresos
