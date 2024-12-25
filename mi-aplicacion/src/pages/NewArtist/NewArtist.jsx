import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import artistController from "../../utils/api/artistController"; // Importa tu controlador de artista
import "./NewArtist.css";

const NewArtist = () => {
    const [name, setUserName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleArtistRegistration = async (e) => {
        e.preventDefault();

        try {
            // Llamar a la función del artistController
            const response = await artistController.createArtist(name);
            const userData = localStorage.getItem("user");
            const user = JSON.parse(userData);
            const isArtist = await artistController.getArtistByUserId(user.id);
            localStorage.setItem("artist", JSON.stringify(isArtist));
            console.log("Registro de artista exitoso:", response);
            navigate("/"); // Redirigir al home o a otra página según sea necesario
        } catch (error) {
            console.error("Error al registrarse como artista:", error);
            setError(error.message);
        }
    };

    return (
        <div className="new-artist-container">
            <h1>Registro de Artista</h1>
            <form onSubmit={handleArtistRegistration} className="new-artist-form">
                <div className="form-group">
                    <label htmlFor="userName">Nombre de artista</label>
                    <input
                        type="text"
                        id="artistName"
                        name="name"
                        placeholder="Ingrese su nombre de artista"
                        value={name}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="btn-register-artist">
                    Registrarse como Artista
                </button>
            </form>
        </div>
    );
};

export default NewArtist;
