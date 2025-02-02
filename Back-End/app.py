from flask import Flask, jsonify
from utils.db import db
from config import Config
from routes.usuario import usuario
from routes.acciones import egreso, ingreso, historial, dashboard
from routes.auth import auth
from flask_cors import CORS
from models.ingreso import Ingreso
from routes.reportes import reporte
from routes.valoracion import valoracion


app = Flask(__name__)
CORS(app)

app.config.from_object(Config)
db.init_app(app)


# Llamo a la ruta de cada clase
app.register_blueprint(auth)
app.register_blueprint(usuario)
app.register_blueprint(dashboard)
app.register_blueprint(historial)
app.register_blueprint(egreso)
app.register_blueprint(ingreso)
app.register_blueprint(reporte)
app.register_blueprint(valoracion)

@app.route('/api/ingresos', methods=['GET'])
def obtener_ingresos():
    # Consulta todos los ingresos
    ingresos = Ingreso.query.all()
    
    # Procesa los datos para devolver solo la fecha y el importe
    data = [
        {
            "fecha": ingreso.fechaYhora.strftime('%Y-%m-%d'),  # Convierte a formato de solo fecha
            "importe": ingreso.importe
        }
        for ingreso in ingresos
    ]
    
    return jsonify(data)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
    CORS(app)