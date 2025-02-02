import os

class Seguridad:
    SECRET_KEY = '123121fasdf*-dhF4_56091237_89'

class Config (Seguridad):
    # Heredo de la clase Seguridad
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://postgres:admin@localhost/GestionFinanciera')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

