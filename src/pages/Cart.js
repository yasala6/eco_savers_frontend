import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3009/eco_savers/cart', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart');
      setLoading(false);
    }
  };

  const updateQuantity = async (foodId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      await axios.put('/api/cart/update', 
        { food_id: foodId, quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchCart(); // Refresh cart after update
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update quantity');
    }
  };

  const removeItem = async (foodId) => {
    try {
      await axios.delete('http://localhost:3009/eco_savers/cart/remove', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: { food_id: foodId }
      });
      fetchCart(); // Refresh cart after removal
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:3009/eco_savers/cart/clear', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCart([]);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart');
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.current_price * item.quantity), 0);
  };

  if (loading) {
    return <div className={styles.container}>Loading your cart...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Your Cart</h2>
      
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty</p>
          <Link to="/shop" className={styles.shopLink}>Continue Shopping</Link>
        </div>
      ) : (
        <>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item.food_id} className={styles.cartItem}>
                <img
                  src={item.image_url || 'https://via.placeholder.com/100x75?text=No+Image'}
                  alt={item.name}
                  className={styles.itemImage}
                />
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p className={styles.condition}>{item.condition.replace(/_/g, ' ')}</p>
                  <p className={styles.price}>£{item.current_price.toFixed(2)} each</p>
                </div>
                <div className={styles.quantityControls}>
                  <button 
                    onClick={() => updateQuantity(item.food_id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.food_id, item.quantity + 1)}>
                    +
                  </button>
                </div>
                <div className={styles.itemTotal}>
                  £{(item.current_price * item.quantity).toFixed(2)}
                </div>
                <button
                  onClick={() => removeItem(item.food_id)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>£{calculateTotal().toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Delivery:</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryRowTotal}>
              <span>Total:</span>
              <span>£{calculateTotal().toFixed(2)}</span>
            </div>
            <button 
              onClick={() => navigate('/checkout')} 
              className={styles.checkoutButton}
            >
              Proceed to Checkout
            </button>
            <button 
              onClick={clearCart} 
              className={styles.clearCartButton}
            >
              Clear Cart
            </button>
            <Link to="/shop" className={styles.continueShopping}>
              Continue Shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;