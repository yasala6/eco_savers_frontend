import React, { useEffect, useState } from 'react';
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3009/eco_savers/api/shop')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data);
        } else {
          console.error('Failed to load products:', data.message);
        }
      })
      .catch((err) => {
        console.error('API error:', err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <h2>Surplus Food Deals</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.food_id}>
            <img
              src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
              alt={product.name}
            />
            <div className={styles.details}>
              <h4>{product.name}</h4>
              <p className={styles.condition}>{product.condition.replace('_', ' ')}</p>
              <p>
                <span className={styles.original}>£{product.original_price}</span>
                <span className={styles.discounted}> £{product.current_price}</span>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
