import React, { useState } from "react";
import "./UploadSong.css";
import songController from "../../utils/api/songController";
import { useNavigate } from "react-router-dom";

const UploadSong = () => {

    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        price: "",
        release_date: today,
        audioFile: null,
        coverImage: null,
    });

    const [showModal, setShowModal] = useState(false); // Estado para mostrar/ocultar el modal

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData({
            ...formData,
            [name]: type === "file" ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();

        // Añadir los datos al FormData
        data.append("title", formData.title);
        data.append("genre", formData.genre);
        data.append("price", formData.price);
        data.append("release_date", formData.release_date);
        data.append("audioFile", formData.audioFile);
        data.append("coverImage", formData.coverImage);

        try {
            const response = await songController.createSong(data);
            console.log("Canción creada:", response);
            setShowModal(true);
        } catch (error) {
            console.error("Error al subir la canción:", error);
            alert("Hubo un error al subir la canción.");
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate("/");
    };

    return (
        <div className="upload-song-container">
            <h1>Subir Canción</h1>
            <form onSubmit={handleSubmit} className="upload-song-form">
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genero</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Precio</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        step="0.01"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="release_date">Fecha de Lanzamiento</label>
                    <input
                        type="date"
                        id="release_date"
                        name="release_date"
                        value={formData.release_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="audioFile">Archivo de Audio</label>
                    <input
                        type="file"
                        id="audioFile"
                        name="audioFile"
                        onChange={handleChange}
                        accept="audio/*"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="coverImage">Imagen de Portada</label>
                    <input
                        type="file"
                        id="coverImage"
                        name="coverImage"
                        onChange={handleChange}
                        accept="image/*"
                        required
                    />
                </div>

                <button type="submit" className="btn-submit">
                    Subir Canción
                </button>
            </form>

            {/* Modal de éxito */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>¡Canción subida con éxito!</h2>
                        <button className="btn-close" onClick={closeModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadSong;
