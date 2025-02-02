from flask import request, Blueprint, jsonify, session
from werkzeug.security import check_password_hash
from models.usuario import Usuario


# Blueprint para la autenticación
auth = Blueprint('auth', __name__)

@auth.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Faltan datos de entrada'}), 400

    usuario = Usuario.query.filter_by(correo=username).first()

    if not usuario:
        return jsonify({'status': 'error', 'message': 'Usuario no encontrado'}), 404

    # Verificar la contraseña
    if not check_password_hash(usuario.contrasena, password):
        return jsonify({'status': 'error', 'message': 'Contraseña incorrecta'}), 401

    # Si todo es correcto, devolver el id del usuario y otros datos
    return jsonify({
        'status': 'success',
        'message': 'Inicio de sesión exitoso',
        'userId': usuario.id,
        'username': usuario.correo,
        'typeUser': usuario.tipoUsuario,
        'nombre' : usuario.nombre,
        'apellido' : usuario.apellido,
        'correo' : usuario.correo,
        'dni' : usuario.dni
    }), 200


@auth.route('/api/logOut', methods=['POST'])
def logOut():
    session.clear()
    return jsonify({'status': 'success', 'message': 'Sesión cerrada'}), 200