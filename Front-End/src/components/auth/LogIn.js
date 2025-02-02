import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import './LogInStyles.css';
import './LogIn.css';
function LogIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', data);

        // Guardar el userId y el tipo de usuario en localStorage
        localStorage.setItem('userId', data.userId); 
        localStorage.setItem('typeUser', data.typeUser);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('correo', data.correo);

        navigate('/dashboard');
      } else {
        console.error('Error en el inicio de sesión:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Inicia Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Correo"
              value={formData.username}
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
          <button className='btnIniciar' type="submit">Iniciar Sesión</button>

          <Link to="/restore">
            <h4>¿Has olvidado tu contraseña?</h4>
          </Link>

          <Link to="/signup">
            <h4>¿Es tu primera vez en STATS? Regístrate</h4>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
