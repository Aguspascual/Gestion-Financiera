import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RestorePage.css';

function RestorePage() {
  const [formData, setFormData] = useState({ email: '' });
  const [loading, setLoading] = useState(false); // Estado para manejar el modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar el modal mientras se envía el correo

    try {
      const response = await fetch('http://127.0.0.1:5000/recuperar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Correo enviado. Revisa tu bandeja de entrada.');
        
        // Redirigir a la página de login después de un segundo
        setTimeout(() => {
          navigate('/login');
        }, 1000); // Espera de 1 segundo antes de redirigir
      } else {
        const data = await response.json();
        alert(data.message || 'Error al enviar el correo.');
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
    } finally {
      setLoading(false); // Cerrar el modal una vez que se haya completado la solicitud
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h1>Recuperar Contraseña</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Enviar Correo</button>
          </form>
        </div>
      </div>

      {/* Modal */}
      {loading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Verifique su correo electrónico. Estamos enviando las instrucciones...</p>
          </div>
        </div>
      )}
    </>
  );
}

export default RestorePage;


