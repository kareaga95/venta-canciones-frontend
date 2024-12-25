import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/images/logo.png" alt="Logo" />
          <p className="footer-title">Song Launcher</p>
        </div>
        <div className="footer-links">
          <ul>
            <li>
              <a href="#about">Sobre Nosotros</a>
            </li>
            <li>
              <a href="#privacy">Política de Privacidad</a>
            </li>
            <li>
              <a href="#terms">Términos y Condiciones</a>
            </li>
          </ul>
        </div>
        <div className="footer-social">
          <p>Síguenos:</p>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Song Launcher. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
