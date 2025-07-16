import React from 'react';
import Hero from '../components/Hero';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.home}>
      <Hero />

      {/* How It Works */}
      <section className={styles.section}>
        <h2>How EcoSavers Works</h2>
        <div className={styles.features}>
          <div>
            <h4>1. Retailers List Surplus</h4>
            <p>Restaurants and stores list food close to expiry at discounted rates.</p>
          </div>
          <div>
            <h4>2. You Shop Smart</h4>
            <p>Browse food deals near you, sorted by freshness, price, or location.</p>
          </div>
          <div>
            <h4>3. Real-Time Reservations</h4>
            <p>Reserve items instantly before they go to waste.</p>
          </div>
          <div>
            <h4>4. Eat & Save</h4>
            <p>Get fresh food, save money, and reduce your carbon footprint.</p>
          </div>
        </div>
      </section>

      {/* Top Surplus Categories */}
      <section className={styles.section}>
        <h2>Popular Food Categories</h2>
        <ul className={styles.categories}>
          <li>Bakery & Pastries</li>
          <li>Fruits & Vegetables</li>
          <li>Dairy & Cheese</li>
          <li>Cooked Meals</li>
          <li>Beverages</li>
        </ul>
      </section>

      {/* Community Reviews */}
      <section className={styles.section}>
        <h2>What Our Users Say</h2>
        <div className={styles.reviews}>
          <blockquote>
            “I bought ₹300 worth of food for just ₹60! This app is a blessing.” – Priya (Chennai)
          </blockquote>
          <blockquote>
            “Helping my restaurant cut waste & still make money.” – Chef Arjun (Mumbai)
          </blockquote>
          <blockquote>
            “It's like saving the planet with every meal!” – Neha (Delhi)
          </blockquote>
        </div>
      </section>

      {/* Impact Stats (Placeholder for future data) */}
      <section className={styles.section}>
        <h2>Your Impact Matters</h2>
        <div className={styles.features}>
          <div>
            <h4>12,000+ Meals Saved</h4>
            <p>That's food that didn’t end up in landfills.</p>
          </div>
          <div>
            <h4>8,500 Kg CO₂ Prevented</h4>
            <p>Reducing emissions, one bite at a time.</p>
          </div>
          <div>
            <h4>1,500+ Happy Retailers</h4>
            <p>Turning losses into profits sustainably.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <h2>Be the Change. Reduce Food Waste.</h2>
        <p>Join EcoSavers and start saving money and the planet, one meal at a time.</p>
        <a href="/register" className={styles.ctaButton}>Join Now</a>
      </section>
    </div>
  );
};

export default Home;
