import { padding } from '@mui/system';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RestorePass() {
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setEmail(queryParams.get('email'));
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/restablecer/contraseña', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: formData.password }),
      });

      if (response.ok) {
        alert('Contraseña restablecida correctamente.');
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.message || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
    }
  };

  return (
    <div className="login-container">
        <div className="login-box">
            <h1>Recuperar Usuario</h1>
            <form onSubmit={handleSubmit}>
              <label>Nueva Contraseña:</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <label>Confirmar Contraseña:</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <br></br>
              <button type="submit" style={{ marginTop: '10px' }}>Restablecer Contraseña</button>
            </form>
        </div>
    </div>
    
  );
}

export default RestorePass;
