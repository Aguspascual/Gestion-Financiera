import React, { useState } from "react";
import './ChangePassword.css';

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idUser = localStorage.getItem("userId"); 
    if (!idUser) {
      setMessage("No se encontró el id de usuario.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/cambiar/contraseña", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idUser,  // Enviar el id del usuario
          newPassword: password, // Enviar la nueva contraseña
        }),
      });

      if (response.ok) {
        setMessage("Contraseña cambiada con éxito.");
        setPassword("");
      } else {
        const data = await response.json();
        setMessage(data.message || "Error al cambiar la contraseña.");
      }
    } catch (error) {
      setMessage("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="change-password-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">Nueva Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Cambiar Contraseña</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ChangePassword;


