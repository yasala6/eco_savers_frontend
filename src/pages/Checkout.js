import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3009/eco_savers/cart?user_id=${userId}`);
      setCart(response.data.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load cart');
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.current_price * item.quantity), 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3009/api/orders', {
        user_id: userId,
        payment_method: paymentMethod,
        delivery_address: deliveryAddress,
        items: cart.map(item => ({
          food_id: item.food_id,
          quantity: item.quantity,
          price: item.current_price
        }))
      });

      await axios.delete('http://localhost:3009/eco_savers/cart/clear', {
        data: { user_id: userId }
      });

      setOrderDetails(response.data.data);
      setOrderPlaced(true);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.container}>{error}</div>;
  }

  if (orderPlaced) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <h2>Order Placed Successfully!</h2>
          <p>Your order ID: {orderDetails.order_id}</p>
          <p>Total Amount: £{orderDetails.total_amount.toFixed(2)}</p>
          <p>Estimated Delivery: {new Date(orderDetails.estimated_delivery).toLocaleString()}</p>
          {/* <button onClick={() => navigate('/orders')} className={styles.viewOrdersButton}>
            View Your Orders
          </button> */}
          <button onClick={() => navigate('/shop')} className={styles.continueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Checkout</h2>
      <div className={styles.checkoutGrid}>
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.food_id} className={styles.checkoutItem}>
              <img
                src={item.image_url || 'https://via.placeholder.com/80x60?text=No+Image'}
                alt={item.name}
                className={styles.checkoutImage}
              />
              <div className={styles.checkoutDetails}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>£{item.current_price.toFixed(2)} each</p>
              </div>
              <div className={styles.checkoutItemTotal}>
                £{(item.current_price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className={styles.checkoutTotals}>
            <div className={styles.checkoutTotalRow}>
              <span>Subtotal:</span>
              <span>£{calculateTotal().toFixed(2)}</span>
            </div>
            <div className={styles.checkoutTotalRow}>
              <span>Delivery:</span>
              <span>Free</span>
            </div>
            <div className={styles.checkoutTotalRow}>
              <span>Total:</span>
              <span>£{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          <h3>Payment & Delivery</h3>
          <div className={styles.formGroup}>
            <label>Payment Method</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank_transfer">Bank Transfer</option>
            </select>
          </div>

          {paymentMethod === 'credit_card' && (
            <div className={styles.creditCardDetails}>
              <div className={styles.formGroup}>
                <label>Card Number</label>
                <input type="text" placeholder="1234 5678 9012 3456" pattern="[\d ]{16,19}" required />
              </div>
              <div className={styles.cardRow}>
                <div className={styles.formGroup}>
                  <label>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" pattern="\d{2}/\d{2}" required />
                </div>
                <div className={styles.formGroup}>
                  <label>CVV</label>
                  <input type="text" placeholder="123" pattern="\d{3}" required />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Cardholder Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Delivery Address</label>
            <textarea
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              required
              rows="4"
            />
          </div>

          <button type="submit" className={styles.placeOrderButton} disabled={cart.length === 0}>
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
