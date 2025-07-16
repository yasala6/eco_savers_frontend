import React from 'react';
import styles from './About.module.css';

const About = () => (
  <div className={styles.about}>
    <h2>About EcoSavers</h2>

    <section className={styles.section}>
      <p>
        <strong>EcoSavers</strong> is a smart and sustainable platform created to combat food waste by connecting consumers with local retailers and restaurants offering surplus and near-expiry food at affordable prices.
        Our goal is to build a bridge between surplus and need, preventing good food from going to waste while helping communities access it affordably.
      </p>
    </section>

    <section className={styles.section}>
      <h3>🌍 Our Mission</h3>
      <p>
        To eliminate food waste through technology, reduce hunger, and lower environmental impact. We empower both individuals and businesses to take part in building a circular food economy.
      </p>
    </section>

    <section className={styles.section}>
      <h3>🍛 What We Offer</h3>
      <ul>
        <li>Real-time listings of surplus food from restaurants and stores</li>
        <li>Discounted prices for quality items close to expiry</li>
        <li>Smart geolocation-based food matching</li>
        <li>Tracking of your food-saving and carbon reduction impact</li>
      </ul>
    </section>

    <section className={styles.section}>
      <h3>📦 Who Benefits?</h3>
      <p>
        <strong>Consumers</strong> save money and enjoy fresh food.  
        <br />
        <strong>Retailers</strong> reduce waste and earn back losses.  
        <br />
        <strong>Communities</strong> get better food access.  
        <br />
        <strong>The planet</strong> suffers less landfill and greenhouse gas emissions.
      </p>
    </section>

    <section className={`${styles.section} ${styles.cta}`}>
      <h3>Join the Movement</h3>
      <p>
        Every meal saved with EcoSavers is a step toward a more sustainable and equitable food system.
      </p>
      <a href="/register" className={styles.joinButton}>Start Saving Food</a>
    </section>
  </div>
);

export default About;
