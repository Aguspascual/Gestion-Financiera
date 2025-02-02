import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DataStyles.css';

function Reporte() {
  const [formData, setFormData] = useState({
    asunto: '',       
    mensaje: '',       
    prioridad: ''     
  });

  const navigate = useNavigate();

  // Verificar si el usuario está autenticado al cargar la página
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado. Redirigiendo al inicio de sesión.');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que todos los campos estén completos
    if (!formData.asunto || !formData.mensaje || !formData.prioridad) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Verificar si el usuario está autenticado
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado. Por favor, inicia sesión.');
      return;
    }

    // Preparar los datos del reporte a enviar al back
    const errorData = {
      ...formData,
      usuario: userId  
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/reporte/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(errorData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Error reportado exitosamente');
        handleCancel(); // Limpiar los campos del formulario después del envío
      } else {
        alert(data.message); // Mostrar mensaje de error del backend
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  const handleCancel = () => {
    // Limpiar los campos del formulario
    setFormData({
      asunto: '',
      mensaje: '',
      prioridad: ''
    });
  };

  return (
    <div className="expense-form">
      <h2>Reportar error</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="asunto">Asunto</label>
          <input
            type="text"
            id="asunto"
            name="asunto"
            className="form-control"
            value={formData.asunto}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Descripción</label>
          <textarea
            id="mensaje"
            name="mensaje"
            className="form-control"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="4"
            maxLength="5000"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="prioridad">Categoría</label>
          <select
            id="prioridad"
            name="prioridad"
            className="form-select"
            value={formData.prioridad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <div className="btn-group">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Reporte;

