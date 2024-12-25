import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SongDetail.css";
import songController from "../../utils/api/songController";
import artistController from "../../utils/api/artistController";

const SongDetail = () => {
  const { id } = useParams();
  const [song, setSong] = useState(null);
  const [artist, setArtist] = useState(null);
  const localhost = "http://localhost:3000/";

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const fetchedSong = await songController.getSongById(id);

        // Formatear la fecha directamente desde fetchedSong
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



  if (!song) {
    return <p>Cargando los detalles de la canción...</p>;
  }

  return (
    <div className="song-detail-container">
      {/* Imagen de la canción */}
      <div className="song-detail-image">
        <img src={`${localhost}${song.cover_image}`} alt={song.title} />
      </div>

      {/* Detalles de la canción */}
      <div className="song-detail-info">
        <h1 className="song-title">{song.title}</h1>
        <h2 className="artist-name">{artist ? artist.name : "Cargando artista..."}</h2>
        <p className="song-release-date">
          <span>Fecha de lanzamiento:</span> {song.release_date}
        </p>
        <p className="song-genre">
          <span>Género:</span> {song.genre}
        </p>
        <button className="btn-save">Comprar {song.price} €</button>
      </div>
    </div>
  );
};

export default SongDetail;
