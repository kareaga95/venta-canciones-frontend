import React, { useEffect, useState } from "react";
import songController from "../../utils/api/songController";
import { useNavigate } from "react-router-dom";
import artistController from "../../utils/api/artistController";
import "./MySongs.css";

const MySongs = ({ userId }) => {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedSongId, setSelectedSongId] = useState(null);
    const localhost = "http://localhost:3000/";
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const artist = await artistController.getArtistByUserId(userId);
                if (!artist) {
                    throw new Error("No tienes permisos de artista o no eres un artista registrado.");
                }
                const artistSongs = await songController.getSongsByArtistId(artist.id);
                setSongs(artistSongs);
            } catch (error) {
                console.error("Error al obtener las canciones del artista:", error);
                setError("Error al obtener las canciones.");
            } finally {
                setLoading(false);
            }
        };

        fetchSongs();
    }, [userId]);

    const handleEdit = (song) => {
        navigate(`/songs/${song.id}/update`);
    };


    const handleDelete = async () => {
        try {
            await songController.deleteSong(selectedSongId);
            setSongs((prevSongs) => prevSongs.filter((song) => song.id !== selectedSongId)); // Actualiza la lista de canciones
            setShowConfirmModal(false);
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error al eliminar la canción:", error);
            alert("No se pudo eliminar la canción. Intenta de nuevo.");
        }
    };

    const openConfirmModal = (songId) => {
        setSelectedSongId(songId);
        setShowConfirmModal(true);
    };

    const closeSuccessModal = () => {
        setShowSuccessModal(false);
    };

    if (loading) {
        return <div>Cargando canciones...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="my-songs-container">
            <h2>Mis Canciones</h2>
            <div className="my-songs-list">
                {songs.length === 0 ? (
                    <p>No has subido ninguna canción aún.</p>
                ) : (
                    songs.map((song) => (
                        <div className="my-song-item" key={song.id}>
                            <div className="my-song-image">
                                <img src={`${localhost}${song.cover_image}`} alt={song.title} />
                            </div>
                            <div className="my-song-details">
                                <h3>{song.title}</h3>
                                <p>Género: {song.genre}</p>
                                <p>Fecha de lanzamiento: {formatDate(song.release_date)}</p>
                                <div className="my-song-buttons">
                                    <button
                                        className="my-edit-button"
                                        onClick={() => handleEdit(song)}
                                    >
                                        Modificar
                                    </button>
                                    <button
                                        className="my-delete-button"
                                        onClick={() => openConfirmModal(song.id)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {showConfirmModal && (
                <div className="modal-overlay-delete-confirm">
                    <div className="modal-delete-confirm">
                        <h3>Confirmar eliminación</h3>
                        <p>¿Estás seguro de que quieres eliminar esta canción?</p>
                        <div className="modal-buttons">
                            <button className="confirm-button" onClick={handleDelete}>
                                Sí, eliminar
                            </button>
                            <button className="cancel-button" onClick={() => setShowConfirmModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="modal-overlay-delete-confirm">
                    <div className="modal-delete-confirm">
                        <h3>Éxito</h3>
                        <p>La canción se ha eliminado con éxito.</p>
                        <button className="close-button" onClick={closeSuccessModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MySongs;
