import './LateralStyles.css';
import './lateralStyle2.css';
import Logo from "../../assets/logo-tam-1.png";
import { Link, useNavigate } from "react-router-dom";  
import { useState, useLayoutEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, History, ArrowUpRight, ArrowDownRight, AlertTriangle, LogOut, ChevronDown } from 'lucide-react';

function Lateral() {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();  

  // Obtener datos del usuario desde localStorage
  const nombre = localStorage.getItem("nombre") || "Usuario";
  const correo = localStorage.getItem("correo") || "correo@ejemplo.com";

  const navItems = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'historical', label: 'Historial', icon: History, path: '/historial' },
    { id: 'newExpense', label: 'Egresos', icon: ArrowUpRight, path: '/egreso' },
    { id: 'newIncome', label: 'Ingresos', icon: ArrowDownRight, path: '/ingreso' },
  ], []);  

  useLayoutEffect(() => {
    const currentPath = location.pathname;
    const currentItem = navItems.find(item => item.path === currentPath);
    setActiveItem(currentItem?.id || ''); 
  }, [location.pathname, navItems]); 

  // Función para manejar el cierre de sesión
  const handleLogout = async () => {
    localStorage.clear();
    try {
      const response = await fetch('/api/logOut', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        console.log('Sesión cerrada correctamente');
      } else {
        console.error('Error al cerrar sesión:', data.message);
      }
    } catch (error) {
      console.error('Error de red al cerrar sesión:', error);
    }
    navigate('/');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Link to="/dashboard">
          <img src={Logo} alt="Logo STATS" />
        </Link>
        <h2 className="nombre">STATS</h2>
      </div>

      <nav>
        <div className="nav-section">
          {navItems.map((item) => (
            <Link key={item.id} to={item.path} className={`nav-item ${activeItem === item.id ? 'active' : ''}`}>
              <item.icon className="nav-icon" size={20} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-section-report">
          <Link to="/report" className={`nav-item report-item ${activeItem === 'report' ? 'active' : ''}`}>
            <AlertTriangle className="nav-icon" size={20} />
            Reportar Problema
          </Link>
          <Link to="/calificacion" className={`nav-item report-item ${activeItem === 'calificacion' ? 'active' : ''}`}>
            <AlertTriangle className="nav-icon" size={20} />
            Calificar
          </Link>
        </div>

        <div className="nav-section-user">
          <div className='user-link' onClick={() => setMenuOpen(!menuOpen)}>
            <div className="header-actions">
              <div className="user-info">
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAXVBMVEX///9ZWVlVVVXl5eVSUlJPT0/7+/tLS0vv7+9ubm7Gxsb39/eAgIDs7OxdXV19fX2Li4uioqLb29tGRkbV1dWWlpa5ubmysrJkZGTAwMA2NjbOzs6cnJxzc3M7Ozv+wJe3AAADOklEQVR4nO3bCZaiMBAGYAlZIOybQKNz/2NO0vbQLiilbZH0vPq8wP/yisrqbkcIIYQQQgghhBBCCCHkfyWzMMyk6xRg2VjGOTPyuBwz12nWRToVDWcssJhoRKoj15kekrpQPLjAVaE9rpCsZFeBP0Oz0tvyaJW4DWwJ1brOtkiOnC0nNkXNRx+LYwzuJjaZ89F1vlvT/TE+jfPkOuG1SD1MbDIr35pdeefL+yZK1xkv6ZUx/hxn7TrluahY6MfXeOpTaWhAYpPZo2GW3WolW6LzpzlnOaCUbXP2Z+KeGkjiIGj86c2VgkVWleukM0i/sHjhOulsAJWyKebBddIZcJDNMLtOOgO1OEu4Tjr7hZFhbdk2ZtdJZ0dgMbOj66Qz2HxtZ2zXSWcjdPbzZzcVQms5dJ10lqSwxWeauE76bQ9bfO5d5zyTFZCNVOHP2tPoIZF71ykvJPFqZhZ7VMlW+7EW+cO7c7l+ZZmv/CoLS1YPGx2v/NmqzpLDg3FWB88K+UvV3PkGWePPpu/KGC9NKYzH/qwtboRVcFMdKqj8WVoskHUnmrPvkDeiCz388C4luhxyUw7mlw+l9vOzuyHDadzvx6n+JXkJIeQpMkkiI0mk97PIbhfVet9XXVd+6rqq3+vap4uoS5Huingwq6ALLBjiovPvHYmM2pL/acTyPTZjvPnDyzbyp0wy3Q3N+oVwM3Taj2OBujoyAbtEE6yoatd5d3UaMOCJ3KlGgtRpaNmmDfie5B/epK2zog4PHHzlcE7wg6N9Sr+404OFjl2camTx2juXR5iKt24eUgcvD/HXQOfbPuqS1TNt4s5As00PkNIfDvEJTzcLnBXAlwFr1FaH5Nl7xtgS6SaZk/cltpm3ODd4Z2KbGT9xBbyWhMI/FJ3eG9jIkR8cZdAbdjh+xP0Euze1t3MK9TK+RkhsyhlzBQ19qvUczIdd01v72zeB9wXCHgQ8D2+xUUPfwz2LDVjV3CMNshlmpE1Ksv54/eXIJc5SI4S+LXtBjrN/xeoXFlLPWHsL8BNI7wjwShntHxw4U98J0gS4/hbndSzGSCwHztDwAeWAIESFkZgQQgghhBBCCCGEEEIImr+hcyZPWXxqhgAAAABJRU5ErkJggg=="
                  alt="Profile" className="user-avatar"
                />
                <p className="user-name">{nombre} <ChevronDown size={16} /></p>
              </div>
            </div>
          </div>
          {menuOpen && <div className="logout-button"><Link to="/restablecerContraseña" size={20}>Cambiar Contraseña</Link><button onClick={handleLogout} className="logout-button"><LogOut size={20} /> Cerrar Sesión</button></div>}
        </div>
      </nav>
    </div>
  );
}

export default Lateral;