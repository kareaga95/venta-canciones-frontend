import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authController from "../../utils/api/authController";
import artistController from "../../utils/api/artistController";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authController.login({ email, password });
      console.log("RESPONSEEE :", response.user.id);

      let isArtist = null;
        try {
          isArtist = await artistController.getArtistByUserId(response.user.id);
        } catch (error) {
          
        }
        
      if (isArtist) {
        localStorage.setItem("artist",  JSON.stringify(isArtist));
      } 
      onLogin(response.user);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>
      </form>
      <div className="register-link">
        <p>
          ¿No tienes una cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
