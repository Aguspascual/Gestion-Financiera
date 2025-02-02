from flask import request, Blueprint, jsonify
from utils.db import db
from datetime import datetime, timedelta
from models.egreso import Egreso
from models.ingreso import Ingreso
from models.usuario import Usuario
import random


# Define el blueprint
egreso = Blueprint('egreso', __name__)

@egreso.route('/egreso/registrar', methods=['POST'])
def registrarEgreso():
    data = request.json
    categoria = data.get('category')
    idUsuario = data.get('idUsuario')
    descripcion = data.get('description')
    fechaYhora = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    importe = data.get('amount')
    metodoPago = data.get('paymentMethod')

    # Validación de campos obligatorios
    if not all([categoria, idUsuario, descripcion, fechaYhora, importe, metodoPago]):
        return jsonify({'status': 'error', 'message': 'Datos incompletos'}), 400

    # Validar que el usuario exista
    usuario = Usuario.query.get(idUsuario)
    if not usuario:
        return jsonify({'status': 'error', 'message': 'Usuario no válido'}), 400

    # Crear el objeto Egreso
    nuevo_egreso = Egreso(
        categoria=categoria,
        idUsuario=idUsuario,
        descripcion=descripcion,
        fechaYhora=fechaYhora,
        importe=importe,
        metodoPago=metodoPago
    )

    # Guardar el objeto en la base de datos
    try:
        db.session.add(nuevo_egreso)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Egreso registrado correctamente'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': 'Error al registrar el egreso', 'error': str(e)}), 500
    


# Define el blueprint
ingreso = Blueprint('ingreso', __name__)

@ingreso.route('/ingreso/registrar', methods=['POST'])
def registrarIngreso():
    data = request.json
    categoria = data.get('category')
    idUsuario = data.get('idUsuario')
    descripcion = data.get('description')
    fechaYhora = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    importe = data.get('amount')

    # Validación de campos obligatorios
    if not all([categoria, idUsuario, descripcion, fechaYhora, importe]):
        return jsonify({'status': 'error', 'message': 'Datos incompletos'}), 400

    # Validar que el usuario exista
    usuario = Usuario.query.get(idUsuario)
    if not usuario:
        return jsonify({'status': 'error', 'message': 'Usuario no válido'}), 400

    # Crear el objeto Ingreso
    nuevo_ingreso = Ingreso(
        categoria=categoria,
        idUsuario=idUsuario,
        descripcion=descripcion,
        fechaYhora=fechaYhora,
        importe=importe
    )

    # Guardar el objeto en la base de datos
    try:
        db.session.add(nuevo_ingreso)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Ingreso registrado correctamente'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'status': 'error', 'message': 'Error al registrar el ingreso', 'error': str(e)}), 500
    


# Define el blueprint
historial = Blueprint('historial', __name__)


@historial.route('/historial', methods=['GET'])
def ver():  
    idUsuario = request.headers.get('idUsuario')
    if not idUsuario:
        return jsonify({"error": "Usuario no autenticado"}), 401

    egresos = Egreso.query.filter_by(idUsuario=idUsuario).all()
    listaEgresos = []
    for egreso in egresos:
        nuev = {
            "id": egreso.id,
            "tipo": "Egreso",
            "categoria": egreso.categoria,
            "descripcion": egreso.descripcion,
            "fecha": egreso.fechaYhora.strftime('%Y-%m-%d'),
            "hora": egreso.fechaYhora.strftime('%H:%M'),
            "importe": egreso.importe
        }
        listaEgresos.append(nuev)
    
    ingresos = Ingreso.query.filter_by(idUsuario=idUsuario).all()
    listaIngresos = []
    for ingreso in ingresos:
        nuev = {
            "id": ingreso.id,
            "tipo": "Ingreso",
            "categoria": ingreso.categoria,
            "descripcion": ingreso.descripcion,
            "fecha": ingreso.fechaYhora.strftime('%Y-%m-%d'),
            "hora": ingreso.fechaYhora.strftime('%H:%M'),
            "importe": ingreso.importe
        }
        listaIngresos.append(nuev)

    # Combinar las dos listas
    listaCombinada = listaEgresos + listaIngresos

    # Ordenar la lista combinada por fecha y hora reconstruida
    Transacciones = sorted(
        listaCombinada,
        key=lambda x: datetime.strptime(f"{x['fecha']} {x['hora']}", "%Y-%m-%d %H:%M"),
        reverse=True 
    )

    return jsonify({"Transacciones": Transacciones})

# Define el blueprint
dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard', methods=['GET'])
def verDashboard():
    idUsuario = request.headers.get('idUsuario')
    if not idUsuario:
        return jsonify({"error": "Usuario no autenticado"}), 401

    try:
        # Consulta todos los ingresos y egresos con categorías
        ingresos = Ingreso.query.filter_by(idUsuario=idUsuario).all()
        egresos = Egreso.query.filter_by(idUsuario=idUsuario).all()

        # Procesa los datos para devolver solo la fecha, importe y categoría
        data_ingresos = [
            {
                "fecha": ingreso.fechaYhora.strftime('%Y-%m-%d'),
                "importe": ingreso.importe,
                "categoria": ingreso.categoria
            }
            for ingreso in ingresos
        ]

        data_egresos = [
            {
                "fecha": egreso.fechaYhora.strftime('%Y-%m-%d'),
                "importe": egreso.importe,
                "categoria": egreso.categoria 
            }
            for egreso in egresos
        ]

        return jsonify({"ingresos": data_ingresos, "egresos": data_egresos})

    except Exception as e:
        return jsonify({"error": "Ocurrió un error al procesar la solicitud", "detalle": str(e)}), 500



@ingreso.route("/g2", methods=["POST"])
def generarIngresos2():
    data = request.json 
    fechaYhora = data['fechaYhora']
    importe = data['importe']
    categoria = data['categoria']
    tipos = data['tipos']
    descripcion = data['descripcion']
    metodosPago = "Efectivo"
    idUsuario = 1

    if tipos == "Ingreso": 
        ingreso = Ingreso(categoria, idUsuario, descripcion, fechaYhora, importe)
        db.session.add(ingreso)
    else:
        egreso = Egreso(categoria, idUsuario, descripcion, fechaYhora, importe, metodosPago)
        db.session.add(egreso)

    db.session.commit()
    return jsonify({"mensaje": "Creado correctamente"}), 200
    


@ingreso.route("/g", methods=["GET"])
def generarIngresos():
    # Configuración
    categorias = ["Alimento", "Transporte", "Servicio", "Subscripciones", "Supermercado", "Shoping", "Otro"]
    tipos = ["Ingreso", "Egreso"]
    importe_min = 500
    importe_max = 99999
    metodos_pago = ["Efectivo", "Tarjeta", "Transferencia"]
    fecha_inicio = datetime(2024, 1, 1)
    fecha_fin = datetime(2025, 12, 31)

    # Generar datos
    transacciones = []
    fecha_actual = fecha_inicio

    while fecha_actual <= fecha_fin:
        importe = random.randint(importe_min, importe_max)
        tipo = random.choice(tipos)
        categoria = random.choice(categorias)

        if tipo == "Ingreso":
            transaccion = Ingreso(
                categoria=categoria,
                idUsuario=1,  
                descripcion=f"Ingreso generado el {fecha_actual.date()}",
                fechaYhora=fecha_actual.strftime('%Y-%m-%d %H:%M:%S'),
                importe=importe
            )
        else:
            transaccion = Egreso(
                categoria=categoria,
                idUsuario=1,  
                descripcion=f"Egreso generado el {fecha_actual.date()}",
                fechaYhora=fecha_actual.strftime('%Y-%m-%d %H:%M:%S'),
                importe=importe,
                metodoPago=random.choice(metodos_pago)
            )

        transacciones.append(transaccion)
        fecha_actual += timedelta(days=1)
    for transaccion in transacciones:
        db.session.add(transaccion)
    db.session.commit()

    return jsonify({"message": f"Se generaron {len(transacciones)} transacciones aleatorias con éxito."}), 200
    


@ingreso.route("/e", methods=["GET"])
def eliminar_todas_transacciones():
    try:
        db.session.query(Ingreso).delete()
        db.session.query(Egreso).delete()
        db.session.commit()
        return jsonify({"status": "success", "message": "Todas las transacciones han sido eliminadas correctamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": "Error al eliminar transacciones", "error": str(e)}), 500