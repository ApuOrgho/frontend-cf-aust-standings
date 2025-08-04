// src/components/Footer.js

import React from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import "../style.css"; // ensure it’s already imported globally in App.js or index.js

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-text">
        © {new Date().getFullYear()} Apu Das Orgho. All rights reserved.
      </div>
      <div className="footer-links">
        <a
          href="https://github.com/ApuOrgho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/apuorgho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://www.facebook.com/apuorgho"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
