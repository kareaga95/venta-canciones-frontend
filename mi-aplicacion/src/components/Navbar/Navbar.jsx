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
    const location = useLocation(); 
    const dropdownRef = useRef(null); 

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedArtist = localStorage.getItem("artist");
        setUser(savedUser ? JSON.parse(savedUser) : null);
        setIsArtist(savedArtist ? JSON.parse(savedArtist) : null);
    }, [location]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
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
        authController.logout();
        localStorage.removeItem("user");
        localStorage.removeItem("artist");
        localStorage.removeItem("token");
        setUser(null);
        setIsArtist(null);
        setIsDropdownVisible(false);
        navigate("/", { replace: true });
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
        event.stopPropagation();
        setIsDropdownVisible((prev) => !prev);
    };

    const handleCloseDropdown = () => {
        setIsDropdownVisible(false);
    };

    const handleBecomeArtist = () => {
        navigate("/artists/new");
    };

    const handleUnsubscribe = () => {
        setShowUnsubscribeModal(true);
    };

    const confirmUnsubscribe = async () => {
        if (!isArtist || !isArtist.id) return;

        try {
            await userController.updateUserStatus(user.id, 0);
            setShowUnsubscribeModal(false);
            authController.logout();
            localStorage.removeItem("user");
            localStorage.removeItem("artist");
            setUser(null);
            setIsArtist(null);
            navigate("/login");
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
                                    {!isArtist || isArtist.active === 0 ? (
                                        <a
                                            className="become-artist-link"
                                            onClick={handleBecomeArtist}
                                            style={{ marginRight: "10px", cursor: "pointer" }}
                                        >
                                            ¿Eres artista?
                                        </a>
                                    ) : null}
                                    {isArtist && isArtist.active === 1 && (
                                        <button className="upload-song-button" onClick={handleUploadSong}>
                                            Subir 🚀
                                        </button>
                                    )}
                                    <span
                                        className="username-display"
                                        onClick={handleToggleDropdown}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {user.username}
                                    </span>
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
