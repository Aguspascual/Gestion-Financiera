import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Calificacion.css';

function Calificacion() {
  const [formData, setFormData] = useState({
    description: '',
    stars: 0
  });
  const [hoverRating, setHoverRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado. Redirigiendo al inicio de sesión.');
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (value) => {
    setFormData((prev) => ({ ...prev, stars: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Usuario no autenticado.');
      return;
    }
    if (!formData.description.trim() || formData.stars === 0) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const calificacionData = { ...formData, idUsuario: userId };

    try {
      const response = await fetch('http://127.0.0.1:5000/valoracion/registrar/valoracion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(calificacionData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Calificación registrada exitosamente');
        setFormData({ description: '', stars: 0 });
      } else {
        alert(data.message || 'Error al registrar la calificación.');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="calificacion-container">
      <h2>Califícanos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Puntuación</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={value <= (hoverRating || formData.stars) ? 'star selected' : 'star'}
                onClick={() => handleRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="btn-group">
          <button type="button" className="btn btn-secondary" onClick={() => setFormData({ description: '', stars: 0 })}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Calificacion;
