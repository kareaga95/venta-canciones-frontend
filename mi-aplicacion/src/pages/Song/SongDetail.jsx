import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SongDetail.css";
import songController from "../../utils/api/songController";
import artistController from "../../utils/api/artistController";
import Payment from "../../components/Payment/Payment";

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [user, setUser] = useState(null); // Estado para verificar si el usuario está autenticado
  const [warningMessage, setWarningMessage] = useState(""); // Estado para el mensaje de advertencia
  const localhost = "http://localhost:3000/";

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const fetchedSong = await songController.getSongById(id);

        if (fetchedSong.release_date) {
          const formattedDate = new Date(fetchedSong.release_date).toISOString().split('T')[0];
          fetchedSong.release_date = formattedDate;
        }

        setSong(fetchedSong);
      } catch (error) {
        console.error("Error fetching song:", error);
      }
    };

    fetchSong();
  }, [id]);

  useEffect(() => {
    if (song && song.artist_id) {
      const fetchArtist = async () => {
        try {
          const fetchedArtist = await artistController.getByArtistId(song.artist_id);
          setArtist(fetchedArtist);
        } catch (error) {
          console.error("Error fetching artist:", error);
        }
      };

      fetchArtist();
    }
  }, [song]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleBuyClick = () => {
    if (!user) {
      setWarningMessage("Para realizar una compra, debes iniciar sesión.");
      return;
    }
    setShowPayment(true);
  };

  if (!song) {
    return <p>Cargando los detalles de la canción...</p>;
  }

  return (
    <div className="song-detail-container">
      {/* Imagen de la canción */}
      <div className="song-detail-image-container">
        <img src={`${localhost}${song.cover_image}`} alt={song.title} />
      </div>

      {/* Detalles de la canción */}
      <div className="song-detail-info-container">
        <h1 className="song-detail-title">{song.title}</h1>
        <h2 className="song-detail-artist-name">{artist ? artist.name : "Cargando artista..."}</h2>
        <p className="song-detail-release-date">
          <span>Fecha de lanzamiento:</span> {song.release_date}
        </p>
        <p className="song-detail-genre">
          <span>Género:</span> {song.genre}
        </p>

        {/* Reproductor de audio */}
        {song.audio_file_path && (
          <div className="audio-player">
            <h3>Escuchar Demo:</h3>
            <audio controls controlsList="nodownload">
              <source src={`${localhost}${song.audio_file_path}`} type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}

        {/* Botón de compra */}
        <button className="song-detail-buy-button" onClick={handleBuyClick}>
          Comprar {song.price} €
        </button>

        {/* Mostrar mensaje de advertencia si el usuario no ha iniciado sesión */}
        {warningMessage && <p className="warning-message">{warningMessage}</p>}

        {/* Formulario de pago */}
        {showPayment && <Payment price={song.price} id={song.id} />}
      </div>
    </div>
  );
};

export default SongDetail;
