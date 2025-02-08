import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import './Footer.css'; // Caso queira adicionar estilos ao footer

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Fale Conosco</p>
        <div className="social-icons">
          <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={40} color="#25D366" />
          </a>
          <a href="https://www.instagram.com/seuperfil" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={40} color="#E4405F" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
