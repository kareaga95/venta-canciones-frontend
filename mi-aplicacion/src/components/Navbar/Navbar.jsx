import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authController from "../../utils/api/authController";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");
    const [user, setUser] = useState(null);
    const [isArtist, setIsArtist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Función para sincronizar el usuario desde localStorage
        const syncUser = () => {
            const userData = localStorage.getItem("user");
            setUser(userData ? JSON.parse(userData) : null);
        };
        syncUser();
        // Escuchar cambios en localStorage
        window.addEventListener("storage", syncUser);
        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener("storage", syncUser);
        };
    }, []);

    useEffect(() => {
        // Función para sincronizar el artista desde localStorage
        const syncArtist = () => {
            const artistData = localStorage.getItem("artist");
            setIsArtist(artistData ? JSON.parse(artistData) : null);
        };
        syncArtist();
        // Escuchar cambios en localStorage
        window.addEventListener("storage", syncArtist);
        // Limpiar el listener al desmontar el componente
        return () => {
            window.removeEventListener("storage", syncArtist);
        };
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleIsArtistClick = () => {
        navigate("/artists/new");
    };

    const handleLogout = () => {
        authController.logout();
        setUser(null);
        navigate("/");
    };


    const handleUploadSongClick = () => {
        navigate("/songs/new");
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                {/* Logo a la izquierda */}
                <div className="navbar-logo">
                    <img src="/images/logo.png" alt="Logo" />
                    <a href="/" className="title">Song Launcher</a>
                </div>

                {/* Input y botones en el centro */}
                <div className="navbar-actions">
                    <input
                        className="search-input"
                        type="text"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Buscar..."
                    />
                    <button className="btn-search" onClick={handleSearch}>
                        Buscar
                    </button>

                </div>

                {/* Acciones a la derecha */}
                <ul className="navbar-right">

                    {user ? (
                        <div className="user-actions">
                            {isArtist ? (
                                // Si es artista, muestra el botón para subir una canción
                                <button className="upload-song-button" onClick={handleUploadSongClick}>
                                    Subir 🚀
                                </button>
                            ) : (
                                // Si no es artista, muestra un enlace que permite convertirse en artista
                                <div>
                                    <li>
                                        <a
                                            className="isArtist-link"
                                            onClick={handleIsArtistClick} // Maneja el clic para convertirse en artista
                                            style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clickeable
                                        >
                                            ¿Eres artista?
                                        </a>
                                    </li>
                                </div>
                            )}
                            <li className="username-display">{user.username}</li>
                            <li>
                                <a
                                    className="logout-link"
                                    onClick={handleLogout}
                                    style={{ cursor: "pointer" }}
                                >
                                    Cerrar Sesión
                                </a>
                            </li>
                        </div>
                    ) : (
                        <li>
                            <a
                                className="login-link"
                                onClick={handleLoginClick}
                                style={{ cursor: "pointer" }}
                            >
                                Iniciar Sesión
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
