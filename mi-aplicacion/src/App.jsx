import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import NewArtist from "./pages/NewArtist/NewArtist";
import Footer from "./components/FooterComponents/Footer";
import SongDetail from "./pages/Song/SongDetail";
import UploadSong from "./pages/Song/UploadSong";
import Register from "./pages/Register/Register";
import UserPurchases from "./pages/Purchases/UserPurchases";
import MySongs from "./pages/MySongs/MySongs";
import EditSong from "./pages/EditSong/EditSong";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);
  console.log("User ID:", user?.id);
  return (
    <div>
      <p>{user && user.username} soy Mikel</p>
      <Router>
        <Navbar user={user} onLogout={() => setUser(null)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/artists/new" element={<NewArtist user={user} />} />
          <Route path="/songs/:id" element={<SongDetail user={user} />} />
          <Route path="/songs/new" element={<UploadSong user={user} />} />
          <Route path="/purchases/user" element={<UserPurchases userId={user?.id} />} />
          <Route path="/songs/artist" element={<MySongs userId={user?.id}/>} />
          <Route path="/songs/:songId/update" element={<EditSong />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;