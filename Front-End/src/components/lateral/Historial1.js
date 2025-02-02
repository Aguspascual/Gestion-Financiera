import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistorialStyles.css';

function Historial1() {
  const navigate = useNavigate();
  const [transacciones, setTransacciones] = useState([]);
  const [filteredTransacciones, setFilteredTransacciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [cantidadVisible, setCantidadVisible] = useState(30); // Número inicial de transacciones visibles

  const categorias = ['Alimentos', 'Transporte', 'Servicios', 'Suscripciones', 'Supermercado', 'Shopping', 'Hogar', 'Otro'];

  useEffect(() => {
    const idUsuario = localStorage.getItem('userId');

    if (!idUsuario) {
      navigate('/login');
      return;
    }

    const fetchHistorial = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/historial', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            idUsuario,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Error al obtener el historial.');
        }

        const data = await response.json();
        setTransacciones(data.Transacciones || []);
        setFilteredTransacciones(data.Transacciones || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, [navigate]);

  useEffect(() => {
    // Filtrar las transacciones cada vez que un filtro cambia
    let transaccionesFiltradas = [...transacciones];

    if (filtroFecha) {
      transaccionesFiltradas = transaccionesFiltradas.filter((transaccion) => {
        const fechaSeleccionada = new Date(filtroFecha).setHours(0, 0, 0, 0); // Fecha del filtro sin horas
        const fechaTransaccion = new Date(transaccion.fecha).setHours(0, 0, 0, 0); // Fecha de la transacción sin horas
        return fechaTransaccion === fechaSeleccionada;
      });
    }

    if (filtroTipo) {
      transaccionesFiltradas = transaccionesFiltradas.filter(
        (transaccion) => transaccion.tipo.toLowerCase() === filtroTipo.toLowerCase()
      );
    }

    if (filtroCategoria) {
      transaccionesFiltradas = transaccionesFiltradas.filter(
        (transaccion) => transaccion.categoria === filtroCategoria
      );
    }

    setFilteredTransacciones(transaccionesFiltradas);
  }, [filtroFecha, filtroTipo, filtroCategoria, transacciones]);

  const limpiarFiltros = () => {
    setFiltroFecha('');
    setFiltroTipo('');
    setFiltroCategoria('');
  };

  const formatearFecha = (fechaISO) => {
    const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('es-ES', opciones).format(new Date(fechaISO));
  };

  const cargarMasTransacciones = () => {
    setCantidadVisible((prev) => prev + 30);
  };

  if (loading) return <div className="loading">Cargando historial...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="historial-container">
      <h2>Historial de Transacciones</h2>

      <div className="filtros">
        <div className="filtro-fecha">
          <label>Filtrar por fecha:</label>
          <input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </div>
        <div className="filtro-tipo">
          <label>Filtrar por tipo:</label>
          <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
            <option value="">Todos</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
        </div>
        <div className="filtro-categoria">
          <label>Filtrar por categoría:</label>
          <select value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <button onClick={limpiarFiltros}>Limpiar Filtros</button>
      </div>

      {filteredTransacciones.length === 0 ? (
        <div>No hay transacciones registradas con estos filtros.</div>
      ) : (
        <>
          <table className="transacciones-tabla">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransacciones.slice(0, cantidadVisible).map((transaccion) => (
                <tr key={transaccion.id}>
                  <td>{transaccion.tipo}</td>
                  <td>{transaccion.categoria || 'N/A'}</td>
                  <td>{transaccion.descripcion}</td>
                  <td>{formatearFecha(transaccion.fecha)}</td>
                  <td>{transaccion.hora}</td>
                  <td>${Math.abs(transaccion.importe).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {cantidadVisible < filteredTransacciones.length && (
            <button onClick={cargarMasTransacciones} className="cargar-mas">
              Cargar Más
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default Historial1;



