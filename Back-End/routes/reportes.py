from flask import Blueprint, request, jsonify
import requests
from models.reportes import Reporte
from models.usuario import Usuario
from utils.db import db
import smtplib
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart

# Define el blueprint
reporte = Blueprint('reporte', __name__)

@reporte.route('/reporte/crear', methods=['POST'])
def registrarReporte():
    # Obtener datos del cuerpo de la solicitud
    data = request.get_json()
    # Validar si faltan campos
    if not data.get('asunto') or not data.get('mensaje') or not data.get('prioridad') or not data.get('usuario'):
        return jsonify({'message': 'Faltan campos obligatorios.'}), 400

    try:
        usuario = Usuario.query.get(data['usuario'])

        if not usuario:
            return jsonify({'message': 'Usuario no encontrado.'}), 404
        nuevo_reporte = Reporte(
            asunto=data['asunto'],
            mensaje=data['mensaje'],
            prioridad=data['prioridad'],
            usuario=data['usuario']
        )
        db.session.add(nuevo_reporte)
        db.session.commit()

        # Datos para enviar a la API externa
        reporte_id = f"F{nuevo_reporte.id}"
        api_data = {
            'id': reporte_id,
            'asunto': nuevo_reporte.asunto,
            'mensaje': nuevo_reporte.mensaje,
            'prioridad': nuevo_reporte.prioridad,
            'categoria': nuevo_reporte.categoría,
            'usuario': usuario.correo,
            'nombre': usuario.nombre,  
            'dni': usuario.dni
        }

        # URL de la API externa
        api_url = 'http://127.0.0.1:5000/api/'

        # Hacer la solicitud POST a la API externa
        try:
            response = requests.post(api_url, json=api_data)
            if response.status_code != 200:
                return jsonify({'message': 'Reporte creado, pero error al enviar a la API externa', 'error': response.text}), 500
        except requests.exceptions.RequestException as e:
            return jsonify({'message': 'Error al conectar con la API externa', 'error': str(e)}), 500

        # Responder con éxito
        return jsonify({'message': 'Reporte creado y enviado a la API externa exitosamente'}), 201

    except Exception as e:
        # En caso de error, capturar y mostrar mensaje
        db.session.rollback() 
        return jsonify({'message': 'Error al crear el reporte', 'error': str(e)}), 500
    

@reporte.route('/api/respuesta', methods=['POST'])
def respuesta():
    try:
        # Obtener los datos de la solicitud
        data = request.get_json()
        if 'id' not in data or 'respuesta' not in data:
            return jsonify({'message': 'Faltan campos obligatorios (id, respuesta)'}), 400

        id_reporte = data['id']
        respuesta_texto = data['respuesta']

        # Envio de correo
        # Función para cargar la plantilla
        def cargar_plantilla(ruta_plantilla, **kwargs):
            with open(ruta_plantilla, 'r') as archivo:
                plantilla = archivo.read()
            # Reemplazar las variables en la plantilla
            for clave, valor in kwargs.items():
                plantilla = plantilla.replace(f"{{{{{clave}}}}}", str(valor))
            return plantilla

        # Datos del correo
        asunto = "Te han respondido al reporte"

        html = cargar_plantilla('templates/emails/respuesta.html', respuesta = respuesta_texto)
        # Configuración del servidor SMTP
        servidor = smtplib.SMTP("smtp.gmail.com", 587)
        servidor.starttls()
        servidor.login("gestionfinanciera76@gmail.com", "wyqb xnoq mlvq jcdq")

        usuario = Usuario.query.get(id_reporte)
        # Crear el mensaje con formato HTML
        msg = MIMEMultipart("alternative")
        msg["From"] = "gestionfinanciera76@gmail.com"
        msg["To"] = usuario.correo
        msg["Subject"] = asunto

        # Adjuntar el mensaje en formato HTML
        parte_html = MIMEText(html, "html")
        msg.attach(parte_html)

        # Enviar el correo
        servidor.sendmail("agestionfinanciera76@gmail.com", usuario.correo, msg.as_string())

        # Cerrar la conexión con el servidor SMTP
        servidor.quit()
        # Responder con éxito
        return jsonify({'message': 'Respuesta recibida correctamente, verifica en su estado localhost:3000/login', 'id': id_reporte, 'respuesta': respuesta_texto}), 200

    except Exception as e:
        return jsonify({'message': 'Error en el servidor', 'error': str(e)}), 500