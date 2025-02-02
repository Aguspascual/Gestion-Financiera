import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import './FooterStyles.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
        {/* Copyright */}
        <div className="copyright">
          <p>© {currentYear} STATS. Todos los derechos reservados.</p>
        </div>
      
    </footer>
);
};

export default Footer;