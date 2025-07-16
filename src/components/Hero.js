import React from 'react';
import styles from './Hero.module.css';
import HeroImg from './close-up-volunteers-working-together.jpg'

const Hero = () => (
  <section className={styles.hero}>
    <div className={styles.text}>
      <h1>Save the Planet with EcoSavers</h1>
      <p>Buy eco-friendly products and track your impact.</p>
    </div>
    <img src={HeroImg} alt="Eco Hero" className={styles.image} />
  </section>
);

export default Hero;
