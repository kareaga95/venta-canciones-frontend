import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import songController from '../../utils/api/songController';
import './EditSong.css'; // Importar el archivo de estilos

const EditSong = () => {
    const { songId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        genre: '',
        price: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false); // Controla la visibilidad del modal de éxito

    useEffect(() => {
        const fetchSong = async () => {
            try {
                const song = await songController.getSongById(songId);
                setFormData({
                    title: song.title,
                    genre: song.genre,
                    price: song.price,
                });
            } catch (error) {
                console.error('Error al obtener la canción:', error);
                setError('No se pudo cargar la canción.');
            } finally {
                setLoading(false);
            }
        };

        fetchSong();
    }, [songId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "price" ? parseFloat(value) : value, // Convertir "price" a número
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await songController.updateSong(songId, formData);
            setShowSuccessModal(true); // Mostrar el modal de éxito
        } catch (error) {
            console.error('Error al actualizar la canción:', error);
            alert('Error al actualizar la canción. Intenta de nuevo.');
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/songs/artist'); // Redirige a la lista de canciones
    };

    if (loading) {
        return <div className="edit-song-loading">Cargando...</div>;
    }

    if (error) {
        return <div className="edit-song-error">{error}</div>;
    }

    return (
        <div className="edit-song-wrapper">
            <h2 className="edit-song-title">Editar Canción</h2>
            <form onSubmit={handleSubmit} className="edit-song-form">
                <div className="edit-song-form-group">
                    <label htmlFor="title" className="edit-song-label">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="edit-song-input"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="edit-song-form-group">
                    <label htmlFor="genre" className="edit-song-label">Género</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        className="edit-song-input"
                        value={formData.genre}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="edit-song-form-group">
                    <label htmlFor="price" className="edit-song-label">Precio</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        className="edit-song-input"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="edit-song-buttons">
                    <button type="submit" className="edit-song-save-button">
                        Guardar cambios
                    </button>
                    <button type="button" className="edit-song-cancel-button" onClick={() => navigate('/songs/artist')}>
                        Cancelar
                    </button>
                </div>
            </form>

            {/* Modal de éxito */}
            {showSuccessModal && (
                <div className="edit-song-modal">
                    <div className="edit-song-modal-content">
                        <h2>¡Éxito!</h2>
                        <p>La canción se ha actualizado correctamente.</p>
                        <button className="edit-song-modal-button" onClick={handleCloseModal}>
                            Volver a mis canciones
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditSong;
