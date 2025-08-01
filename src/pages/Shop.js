import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Shop.module.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    condition: 'all',
    discount: 'all',
    searchQuery: ''
  });

  useEffect(() => {
    fetch('http://localhost:3009/eco_savers/api/shop')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProducts(data.data);
          setFilteredProducts(data.data);
        } else {
          console.error('Failed to load products:', data.message);
        }
      })
      .catch((err) => {
        console.error('API error:', err);
      });

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, products]);

  const applyFilters = () => {
    let result = [...products];

    // Apply search filter
    if (filters.searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(product =>
      product.current_price >= filters.priceRange[0] &&
      product.current_price <= filters.priceRange[1]
    );

    // Apply condition filter
    if (filters.condition !== 'all') {
      result = result.filter(product =>
        product.condition === filters.condition
      );
    }

    // Apply discount filter
    if (filters.discount !== 'all') {
      const threshold = filters.discount === 'high' ? 0.5 : 0.2;
      result = result.filter(product =>
        (product.original_price - product.current_price) / product.original_price >= threshold
      );
    }

    setFilteredProducts(result);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.food_id === product.food_id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.food_id === product.food_id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePriceRangeChange = (e, index) => {
    const newPriceRange = [...filters.priceRange];
    newPriceRange[index] = Number(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Surplus Food Deals</h2>
        <Link to="/cart" className={styles.cartLink}>
          🛒 Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
        </Link>
      </div>

      <div className={styles.filterPanel}>
        <div className={styles.filterGroup}>
          <label>Search:</label>
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery}
            onChange={handleFilterChange}
            placeholder="Search products..."
          />
        </div>

        <div className={styles.filterGroup}>
          <label>Price Range: £{filters.priceRange[0]} - £{filters.priceRange[1]}</label>
          <div className={styles.rangeInputs}>
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e, 0)}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e, 1)}
            />
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label>Condition:</label>
          <select
            name="condition"
            value={filters.condition}
            onChange={handleFilterChange}
          >
            <option value="all">All Conditions</option>
            <option value="fresh">Fresh</option>
            <option value="near_expiry">Near Expiry</option>
            <option value="expired">Expired (Still Safe)</option>
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label>Discount:</label>
          <select
            name="discount"
            value={filters.discount}
            onChange={handleFilterChange}
          >
            <option value="all">Any Discount</option>
            <option value="medium">20%+ Off</option>
            <option value="high">50%+ Off</option>
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className={styles.card} key={product.food_id}>
              <img
                src={product.image_url || 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={product.name}
              />
              <div className={styles.details}>
                <h4>{product.name}</h4>
                <p className={styles.condition}>{product.condition.replace(/_/g, ' ')}</p>
                <p>
                  <span className={styles.original}>£{product.original_price.toFixed(2)}</span>
                  <span className={styles.discounted}> £{product.current_price.toFixed(2)}</span>
                  <span className={styles.discountPercentage}>
                    ({Math.round((1 - product.current_price / product.original_price) * 100)}% off)
                  </span>
                </p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>No products match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default Shop;