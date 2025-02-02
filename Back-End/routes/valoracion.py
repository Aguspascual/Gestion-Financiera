from flask import Flask, request, jsonify, Blueprint
from models.usuario import Usuario
import requests

valoracion = Blueprint('valoracion', __name__)

@valoracion.route('/registrar/valoracion', methods=['POST'])
def registrarValoracion():
    try:
        # Obtener datos del frontend
        data = request.get_json()
        id_usuario = data.get('idUsuario')
        stars = data.get('stars')
        description = data.get('description')

        if not id_usuario or not stars or not description:
            return jsonify({'message': 'Faltan campos obligatorios'}), 400

        # Buscar usuario en la base de datos
        usuario = Usuario.query.get(id_usuario)

        if not usuario:
            return jsonify({'message': 'Usuario no encontrado'}), 404

        # Preparar los datos para el registro en el endpoint externo
        register_data = {
            "email": usuario.correo,
            "username": usuario.nombre,
            "password": usuario.dni
        }

        # Enviar solicitud al endpoint externo para registrar usuario
        REGISTER_URL = "http://localhost:8000/register/"
        response = requests.post(REGISTER_URL, json=register_data)

        # Extraer el token de la respuesta
        response_data = response.json()
        token = response_data.get("token")

        if not token:
            return jsonify({'message': 'No se recibió token'}), 500

        # Registrar la valoración usando el token obtenido
        REVIEW_URL = "http://localhost:8000/posts/3/reviews/"   #3 es el ID del usuario que creo el posteo
        review_data = {
            "comment": description,
            "rating": stars
        }

        headers = {
            "Authorization": f"Token {token}",
            "Content-Type": "application/json"
        }

        review_response = requests.post(REVIEW_URL, json=review_data, headers=headers)

        if review_response.status_code != 201:
            return jsonify({'message': 'Error al registrar la valoración', 'error': review_response.text}), 500

        return jsonify({'message': 'Valoración registrada exitosamente'}), 201

    except Exception as e:
        return jsonify({'message': 'Error en el servidor', 'error': str(e)}), 500
