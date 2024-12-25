import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NewArtist from "./pages/NewArtist/NewArtist";
import Footer from "./components/FooterComponents/Footer";
import SongDetail from "./pages/Song/SongDetail";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardar el usuario en localStorage
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <div>
      <p>{user && user.username} soy Mikel</p>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/artists/new" element={<NewArtist user={user} />} />
          <Route path="/songs/:id" element={<SongDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;