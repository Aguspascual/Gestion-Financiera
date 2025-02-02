import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import "./Ingreso-1.css";

function Ingreso1() {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
  });
  const [categories, setCategories] = useState([
    "Alimentos",
    "Transporte",
    "Servicios",
    "Suscripciones",
    "Supermercado",
    "Shopping",
    "Hogar",
    "Otro",
  ]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Usuario no autenticado. Redirigiendo al inicio de sesión.");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Usuario no autenticado. Por favor, inicia sesión.");
      return;
    }
    if (!formData.description || !formData.amount || !formData.category) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      alert("El importe debe ser un número mayor a cero.");
      return;
    }
    const ingresoData = { ...formData, idUsuario: userId };
    try {
      const response = await fetch("http://127.0.0.1:5000/ingreso/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingresoData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Ingreso registrado exitosamente");
        handleCancel();
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("No se pudo conectar con el servidor");
    }
  };

  const handleCancel = () => {
    setFormData({ description: "", amount: "", category: "" });
  };

  const handleAddCategory = () => {
    setShowNewCategoryInput(true);
  };

  const handleNewCategorySubmit = () => {
    if (newCategory.trim()) {
      setCategories((prev) => [...prev, newCategory.trim().toLowerCase()]);
      setNewCategory("");
      setShowNewCategoryInput(false);
    }
  };

  return (
    <div className="expense-form-container">
      <div className="expense-form">
        <h2>Datos de Ingresos</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
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
            <label htmlFor="amount">Importe</label>
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
            <label htmlFor="category">Categoría</label>
            {showNewCategoryInput ? (
              <div className="new-category">
                <input
                  type="text"
                  className="form-control"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Nueva categoría"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleNewCategorySubmit();
                    }
                  }}
                />
                <div className="new-category-buttons">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNewCategorySubmit}
                  >
                    Agregar
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowNewCategoryInput(false);
                      setNewCategory("");
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <select
                id="category"
                name="category"
                className="form-control"
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
            )}
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
    </div>
  );
}

export default Ingreso1;
