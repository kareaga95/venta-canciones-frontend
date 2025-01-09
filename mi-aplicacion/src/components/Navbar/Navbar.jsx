import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authController from "../../utils/api/authController";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
    const [searchValue, setSearchValue] = useState("");
    const [user, setUser] = useState(null);
    const [isArtist, setIsArtist] = useState(null);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const syncUser = () => {
            const userData = localStorage.getItem("user");
            setUser(userData ? JSON.parse(userData) : null);
        };
        syncUser();
        window.addEventListener("storage", syncUser);
        return () => {
            window.removeEventListener("storage", syncUser);
        };
    }, []);

    useEffect(() => {
        const syncArtist = () => {
            const artistData = localStorage.getItem("artist");
            setIsArtist(artistData ? JSON.parse(artistData) : null);
        };
        syncArtist();
        window.addEventListener("storage", syncArtist);
        return () => {
            window.removeEventListener("storage", syncArtist);
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

    const handleIsArtist = () => {
        navigate("/artists/new");
    };

    const handleLogout = () => {
        authController.logout();
        setUser(null);
        setIsDropdownVisible(false);
        navigate("/");
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".username-container")) {
                handleCloseDropdown();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleUnsubscribe = () => {
        alert("Solicitud para darse de baja enviada.");
    };

    const handleCustomerService = () => {
        alert("Redirigiendo a Atención al Cliente...");
    };

    return (
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
                            {isArtist && (
                                <button className="upload-song-button" onClick={handleUploadSong}>
                                    Subir 🚀
                                </button>
                            )}
                            <li className="username-container">
                                <span
                                    className="username-display"
                                    onClick={handleToggleDropdown}
                                    style={{ cursor: "pointer" }}
                                >
                                    {user.username}
                                </span>
                                {isDropdownVisible && (
                                    <div className="dropdown-menu">
                                        <ul>
                                            <li onClick={handleMySongs}>Mis canciones</li>
                                            <li onClick={handleUserPurchases}>Mis compras</li> {/* Mis compras dentro del menú */}
                                            <li onClick={handleUnsubscribe}>Darse de baja</li>
                                            <li onClick={handleCustomerService}>Atención al cliente</li>
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
    );
};

export default Navbar;
