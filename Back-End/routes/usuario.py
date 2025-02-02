from flask import Blueprint, request, jsonify
from models.usuario import Usuario
from werkzeug.security import generate_password_hash
from utils.db import db
import smtplib
from email.mime.text import MIMEText 
from email.mime.multipart import MIMEMultipart


# Define el blueprint
usuario = Blueprint('usuario', __name__)

@usuario.route('/usuario/crear', methods=['POST'])
def registrarUsuario():
    # Recibe datos en formato JSON
    data = request.json  

    # Obtener datos del formulario
    first_name = data.get('firstName')
    last_name = data.get('lastName')
    correo = data.get('email')
    contrasena = data.get('password')
    confirm_password = data.get('confirmPassword')
    tipoUsuario = data.get('typeUser') 
    dni = data.get('dni')

    # Validaciones
    if not (first_name and last_name and correo and contrasena and confirm_password and dni):
        return jsonify({'status': 'error', 'message': 'Faltan campos obligatorios'}), 400

    if contrasena != confirm_password:
        return jsonify({'status': 'error', 'message': 'Las contraseñas no coinciden'}), 400

    if Usuario.query.filter_by(correo=correo).first():
        return jsonify({'status': 'error', 'message': 'El correo ya está registrado'}), 409

    # Encriptar la contraseña
    contrasena_hash = generate_password_hash(contrasena)

    # Crear el usuario en la base de datos
    usuario = Usuario(
        nombre=first_name,
        apellido=last_name,
        correo=correo,
        contrasena=contrasena_hash,
        tipoUsuario=tipoUsuario,
        dni=dni
    )
    db.session.add(usuario)
    db.session.commit()

    # Envio de correo
    # Función para cargar la plantilla y reemplazar variables
    def cargar_plantilla(ruta_plantilla, **kwargs):
        with open(ruta_plantilla, 'r') as archivo:
            plantilla = archivo.read()
        # Reemplazar las variables en la plantilla
        for clave, valor in kwargs.items():
            plantilla = plantilla.replace(f"{{{{{clave}}}}}", str(valor))
        return plantilla

    # Datos del correo
    asunto = "Registro de usuario"

    html = cargar_plantilla('templates/emails/registro.html', nombre = first_name)
    # Configuración del servidor SMTP
    servidor = smtplib.SMTP("smtp.gmail.com", 587)
    servidor.starttls()
    servidor.login("gestionfinanciera76@gmail.com", "wyqb xnoq mlvq jcdq")

    # Crear el mensaje con formato HTML
    msg = MIMEMultipart("alternative")
    msg["From"] = "gestionfinanciera76@gmail.com"
    msg["To"] = correo
    msg["Subject"] = asunto

    # Adjuntar el mensaje en formato HTML
    parte_html = MIMEText(html, "html")
    msg.attach(parte_html)

    # Enviar el correo
    servidor.sendmail("agestionfinanciera76@gmail.com", correo, msg.as_string())

    # Cerrar la conexión con el servidor SMTP
    servidor.quit()

    return jsonify({'status': 'success', 'message': 'Usuario registrado correctamente'}), 201


@usuario.route('/recuperar', methods=['POST'])
def recuperar():
    data = request.json
    correo = data.get('email')

    # Envio de correo
    # Función para cargar la plantilla y reemplazar variables
    def cargar_plantilla(ruta_plantilla, **kwargs):
        with open(ruta_plantilla, 'r') as archivo:
            plantilla = archivo.read()
        # Reemplazar las variables en la plantilla
        for clave, valor in kwargs.items():
            plantilla = plantilla.replace(f"{{{{{clave}}}}}", str(valor))
        return plantilla

    # Datos del correo
    asunto = "Recuperar usuario"

    html = cargar_plantilla('templates/emails/recuperar.html', correo=correo)
    # Configuración del servidor SMTP
    servidor = smtplib.SMTP("smtp.gmail.com", 587)
    servidor.starttls()
    servidor.login("gestionfinanciera76@gmail.com", "wyqb xnoq mlvq jcdq")

    # Crear el mensaje con formato HTML
    msg = MIMEMultipart("alternative")
    msg["From"] = "gestionfinanciera76@gmail.com"
    msg["To"] = correo
    msg["Subject"] = asunto

    # Adjuntar el mensaje en formato HTML
    parte_html = MIMEText(html, "html")
    msg.attach(parte_html)

    # Enviar el correo
    servidor.sendmail("agestionfinanciera76@gmail.com", correo, msg.as_string())

    # Cerrar la conexión con el servidor SMTP
    servidor.quit()
    return jsonify({'status': 'success', 'message': 'Correo enviado correctamente. Revisa tu bandeja de entrada.'}), 200



@usuario.route('/restablecer/contraseña', methods=['POST'])
def restablecer_contrasena():
    data = request.json
    correo = data.get('email')
    nueva_contrasena = data.get('password')

    usuario = Usuario.query.filter_by(correo=correo).first()

    if usuario:
        # Actualizar la contraseña en la base de datos
        usuario.contrasena = generate_password_hash(nueva_contrasena)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Contraseña actualizada correctamente.'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Usuario no encontrado.'}), 404
    

@usuario.route('/cambiar/contraseña', methods=['POST'])
def cambiarContrasena():
    data = request.json
    id = data.get('id')
    nueva_contrasena = data.get('newPassword')

    # Buscar al usuario por su id
    usuario = Usuario.query.filter_by(id=id).first()  # Corregir la consulta a la base de datos
    if usuario:
        # Actualizar la contraseña en la base de datos
        usuario.contrasena = generate_password_hash(nueva_contrasena)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Contraseña actualizada correctamente.'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Usuario no encontrado.'}), 404