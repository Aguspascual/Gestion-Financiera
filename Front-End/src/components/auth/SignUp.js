import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LogInStyles.css';

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dni: '',
    typeUser: 'cliente',
  });

  const [loading, setLoading] = useState(false); 
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

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/usuario/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Registro exitoso:', data);

        // Guardar datos adicionales en localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', data.typeUser);
        localStorage.setItem('dni', data.dni);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('correo', data.correo);

        alert('Registro exitoso. Por favor, inicia sesión.');
        navigate('/login'); 
      } else {
        console.error('Error en el registro:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-box">
          <h1>Registrar</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
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
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="dni"
                placeholder="DNI"
                value={formData.dni}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Registrar</button>
            <Link to="/login" className="btnIniciar">Iniciar Sesión</Link>
          </form>
        </div>
      </div>

      {/* Modal de carga */}
      {loading && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Registrando usuario... Por favor espere.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUp;


