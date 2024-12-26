import React, { useEffect, useState } from "react";
import { getSongs } from "../../utils/api/songController";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const localhost = "http://localhost:3000/";
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const fetchSongs = async (filters = {}) => {
    try {
      const fetchedSongs = await getSongs(filters);
      setSongs(fetchedSongs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  useEffect(() => {
    fetchSongs(); // Cargar todas las canciones al inicio
  }, []);

  const handleSearch = (searchValue) => {
    fetchSongs({ search: searchValue }); // Filtrar canciones al buscar
  };

  const handleClick = (song) => {
    console.log("Canción seleccionada:", song);
    navigate(`/songs/${song.id}`);
    // Aquí puedes usar el objeto song para lo que necesites (navegación, detalles, etc.)
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} /> {/* Pasar función de búsqueda */}
      <div className="home-page-container">
        <h1 className="home-page-title">Nuevos Lanzamientos</h1>
        <div className="songs-grid-container">
          {songs.map((song) => (
            <div
              className="song-card-item"
              key={song.id}
              onClick={() => handleClick(song)}
              style={{ cursor: "pointer" }} // Pasar el objeto completo al hacer clic
            >
              <img
                src={`${localhost}${song.cover_image}`}
                alt={song.title}
                className="song-card-image"
              />
              <div className="song-card-info">
                <p className="song-card-title">{song.title}</p>
                <p className="song-card-artist">{song.artist.name}</p>
                <p className="song-card-price">{`€${song.price}`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
