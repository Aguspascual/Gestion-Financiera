from utils.db import db

class Egreso(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    categoria = db.Column(db.String(255))
    idUsuario = db.Column(db.Integer)
    descripcion = db.Column(db.String(255))
    fechaYhora = db.Column(db.DateTime)
    importe = db.Column(db.Float)
    metodoPago = db.Column(db.String(255))

    def __init__(self, categoria, idUsuario, descripcion,  fechaYhora, importe, metodoPago):
        self.categoria = categoria
        self.idUsuario = idUsuario
        self.descripcion = descripcion
        self.fechaYhora = fechaYhora
        self.importe = importe
        self.metodoPago = metodoPago


    def historial(self, idUsuario):
        egresos = Egreso.query.filter_by(idUsuario=idUsuario).all()
        return egresos