import React, { useEffect, useState } from "react";
import purchaseController from "../../utils/api/purchaseController"; // Importa el controlador de compras
import songController from "../../utils/api/songController"; // Importa el controlador de canciones 
import artistController from "../../utils/api/artistController"; // Importa el controlador de artistas
import "./UserPurchases.css";

const UserPurchases = ({ userId }) => {
    const [purchases, setPurchases] = useState([]); // Aquí almacenamos las compras con sus canciones
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const localhost = "http://localhost:3000/";

    useEffect(() => {
        // Cargar todas las compras del usuario cuando el componente se monte
        const fetchPurchases = async () => {
            try {
                const userPurchases = await purchaseController.getAllPurchasesByUserId(userId);
                // Obtener detalles de cada canción comprada usando song_id y almacenarlo directamente en `song` de cada compra
                const updatedPurchases = await Promise.all(
                    userPurchases.map(async (purchase) => {
                        
                        const song = await songController.getSongById(purchase.song_id);
                        const artist = await artistController.getByArtistId(purchase.song.artist_id);
                        console.log("artist ", artist);
                        return { ...purchase, song, artist }; // Almacena directamente el objeto de la canción en `song`
                    })
                );
                setPurchases(updatedPurchases); // Actualiza las compras con las canciones detalladas
            } catch (error) {
                setError("Error al obtener las compras");
            } finally {
                setLoading(false);
            }
        };

        fetchPurchases();
    }, [userId]);

    const handleDownload = (song) => {
        console.log("Song song song ", song)
        songController.downloadSong(song); // Llama a la función para descargar la canción
        console.log("Descargando canción con ID: ", song.id);
        // Aquí puedes hacer una solicitud para descargar la canción desde el backend.
    };

    if (loading) {
        return <div>Cargando compras...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
console.log(purchases);
    return (
        <div className="purchases-container">
            <h2>Mis Compras</h2>
            <div className="purchases-list">
                {purchases.map((purchase) => (
                    <div className="purchase-item" key={purchase.id}>
                        <div className="purchase-image">
                            <img src={`${localhost}${purchase.song.cover_image}`} alt={purchase.song.title} />
                        </div>
                        <div className="purchase-details">
                            <h3>{purchase.song.title}</h3>
                            <p>{purchase.artist.name}</p>
                            <p>Fecha compra: {purchase.purchase_date}</p>
                            <button
                                className="download-button"
                                onClick={() => handleDownload(purchase)}
                            >
                                Descargar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserPurchases;
