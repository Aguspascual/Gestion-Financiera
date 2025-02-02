import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import './DataStyles.css';

function Egreso1() {
  const navigate = useNavigate();

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    paymentMethod: '',
  });

  // Estado para las categorías existentes
  const [categories, setCategories] = useState([
    'Alimentos',
    'Transporte',
    'Servicios',
    'Suscripciones',
    'Supermercado',
    'Shopping',
    'Hogar',
    'Otro',
  ]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/login');
    }
  }, [navigate]);

  // Manejar cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Limpiar el formulario
  const handleCancel = () => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      paymentMethod: '',
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Usuario no autenticado. Por favor, inicia sesión.');
      return;
    }

    if (!formData.description || !formData.amount || !formData.category || !formData.paymentMethod) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      alert('El importe debe ser un número mayor a cero.');
      return;
    }

    const egresoData = {
      ...formData,
      idUsuario: userId,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/egreso/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(egresoData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Egreso registrado exitosamente:', data);
        alert('Egreso registrado exitosamente');
        handleCancel();
      } else {
        console.error('Error al registrar egreso:', data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo conectar con el servidor');
    }
  };

  // Mostrar el input para agregar una nueva categoría
  const handleAddCategory = () => {
    setShowNewCategoryInput(true);
  };

  // Manejar la creación de una nueva categoría
  const handleNewCategorySubmit = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory.trim().toLowerCase()]);
      setNewCategory('');
      setShowNewCategoryInput(false);
    }
  };

  return (
    <div className="expense-form">
      <h2>Datos de Egresos</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">DESCRIPCIÓN</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">IMPORTE</label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">CATEGORÍA</label>
          <select
            id="category"
            name="category"
            className="form-control form-select"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar categoría</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="paymentMethod">MÉTODO DE PAGO</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            className="form-control form-select"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar método</option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
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

export default Egreso1;
