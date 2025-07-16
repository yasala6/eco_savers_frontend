import React from 'react';
import styles from './Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} EcoSavers. All rights reserved.</p>
  </footer>
);

export default Footer;
