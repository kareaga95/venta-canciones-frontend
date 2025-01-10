import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import authController from "../../utils/api/authController";
import "./Navbar.css";
import userController from "../../utils/api/userController";

const Navbar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isArtist, setIsArtist] = useState(() => {
        const savedArtist = localStorage.getItem("artist");
        return savedArtist ? JSON.parse(savedArtist) : null;
    });
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); // Para escuchar cambios de rutas
    const dropdownRef = useRef(null); // Referencia para el dropdown

    // Rehidratar el estado del usuario y artista al cargar o cambiar de ruta
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedArtist = localStorage.getItem("artist");
        setUser(savedUser ? JSON.parse(savedUser) : null);
        setIsArtist(savedArtist ? JSON.parse(savedArtist) : null);
    }, [location]); // Rehidrata al cambiar de ruta

    // Cerrar el dropdown al hacer clic fuera
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false); // Cierra el menú si el clic es fuera
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick); // Limpia el listener al desmontar
        };
    }, []);

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        console.log("Cerrando sesión...");
        authController.logout(); // Acción de logout
        localStorage.removeItem("user");
        localStorage.removeItem("artist");
        localStorage.removeItem("token"); // Asegurarse de eliminar el token si existe
        setUser(null); // Resetear el estado de usuario
        setIsArtist(null); // Resetear el estado de artista
        setIsDropdownVisible(false);
        navigate("/", { replace: true }); // Redirige a inicio reemplazando el historial
    };

    const handleUploadSong = () => {
        navigate("/songs/new");
    };

    const handleUserPurchases = () => {
        navigate("/purchases/user");
    };

    const handleMySongs = () => {
        navigate("/songs/artist");
    };

    const handleToggleDropdown = (event) => {
        event.stopPropagation(); // Prevenir que se cierre inmediatamente al hacer clic dentro
        setIsDropdownVisible((prev) => !prev);
    };

    const handleCloseDropdown = () => {
        setIsDropdownVisible(false);
    };

    const handleBecomeArtist = () => {
        navigate("/artists/new"); // Redirige al formulario de registro de artista
    };

    const handleUnsubscribe = () => {
        setShowUnsubscribeModal(true);
    };

    const confirmUnsubscribe = async () => {
        if (!isArtist || !isArtist.id) return;

        try {
            await userController.updateUserStatus(user.id, 0); // Actualiza el estado en la base de datos
            setShowUnsubscribeModal(false);
            authController.logout(); // Realiza logout después de la baja
            localStorage.removeItem("user");
            localStorage.removeItem("artist");
            setUser(null);
            setIsArtist(null);
            navigate("/login"); // Redirige a la pantalla de login
        } catch (error) {
            console.error("Error al solicitar la baja:", error);
            alert("Error al solicitar la baja. Inténtalo nuevamente.");
        }
    };

    const cancelUnsubscribe = () => {
        setShowUnsubscribeModal(false);
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo">
                        <img src="/images/logo.png" alt="Logo" />
                        <a href="/" className="title">Song Launcher</a>
                    </div>

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

                    <ul className="navbar-right">
                        {user ? (
                            <div className="user-actions">
                                <li className="username-container">
                                    {/* Enlace "¿Eres artista?" visible solo si no es artista */}
                                    {!isArtist || isArtist.active === 0 ? (
                                        <a
                                            className="become-artist-link"
                                            onClick={handleBecomeArtist}
                                            style={{ marginRight: "10px", cursor: "pointer" }}
                                        >
                                            ¿Eres artista?
                                        </a>
                                    ) : null}

                                    {/* Botón "Subir Canción" visible solo si es un artista activo */}
                                    {isArtist && isArtist.active === 1 && (
                                        <button className="upload-song-button" onClick={handleUploadSong}>
                                            Subir 🚀
                                        </button>
                                    )}

                                    {/* Nombre del usuario */}
                                    <span
                                        className="username-display"
                                        onClick={handleToggleDropdown}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {user.username}
                                    </span>

                                    {/* Dropdown con opciones */}
                                    {isDropdownVisible && (
                                        <div className="dropdown-menu" ref={dropdownRef}>
                                            <ul>
                                                {isArtist && isArtist.active === 1 && (
                                                    <>
                                                        <li onClick={handleMySongs}>Mis canciones</li>
                                                    </>
                                                )}
                                                <li onClick={handleUserPurchases}>Mis compras</li>
                                                <li onClick={handleUnsubscribe}>Darse de baja</li>
                                                <li onClick={handleLogout}>Cerrar Sesión</li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </div>
                        ) : (
                            <li>
                                <a
                                    className="login-link"
                                    onClick={handleLogin}
                                    style={{ cursor: "pointer" }}
                                >
                                    Iniciar Sesión
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </nav>

            {/* Modal de confirmación de baja */}
            {showUnsubscribeModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Confirmar baja</h2>
                        <p>¿Estás seguro de que quieres darte de baja como usuario?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={confirmUnsubscribe}>
                                Sí, darse de baja
                            </button>
                            <button className="cancel-button" onClick={cancelUnsubscribe}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
