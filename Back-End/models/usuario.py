from utils.db import db

#TIPO DE USUARIO
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    nombre = db.Column(db.String(255))
    apellido = db.Column(db.String(255))
    correo = db.Column(db.String(255))
    contrasena = db.Column(db.String(255))
    tipoUsuario = db.Column(db.String(255))
    dni = db.Column(db.Integer)

    def __init__(self, nombre,apellido, correo, contrasena, tipoUsuario, dni):
        self.nombre = nombre
        self.apellido=apellido
        self.correo = correo
        self.contrasena = contrasena
        self.tipoUsuario = tipoUsuario
        self.dni = dni
    

