import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [accountNumber, setAccountNumber] = useState(""); // Nuevo campo para el número de cuenta
    const [bankName, setBankName] = useState(""); // Nuevo campo para el nombre del banco
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ 
                    username, 
                    email, 
                    password,  
                    confirmPassword,
                    accountNumber,  // Enviar la información bancaria
                    bankName        // Enviar la información bancaria
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error al registrarse");
            }

            console.log("Registro exitoso");
            navigate("/login"); // Redirigir a la página de inicio de sesión
        } catch (error) {
            console.error("Error al registrarse:", error);
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <h1>Registro</h1>
            <form onSubmit={handleRegister} className="register-form">
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Ingrese su nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirme su contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Nuevos campos para la información bancaria */}
                <div className="form-group">
                    <label htmlFor="accountNumber">Número de Cuenta Bancaria</label>
                    <input
                        type="text"
                        id="accountNumber"
                        name="accountNumber"
                        placeholder="Ingrese su número de cuenta bancaria"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bankName">Nombre del Banco</label>
                    <input
                        type="text"
                        id="bankName"
                        name="bankName"
                        placeholder="Ingrese el nombre de su banco"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn-register">
                    Registrarse
                </button>
            </form>
            <div className="login-link">
                <p>
                    ¿Ya tienes una cuenta? <a href="/login">Inicia Sesión</a>
                </p>
            </div>
        </div>
    );
};

export default Register;
