import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [orderRes, userRes, productRes] = await Promise.all([
        axios.get('http://localhost:3009/api/admin/orders'),
        axios.get('http://localhost:3009/api/admin/users'),
        axios.get('http://localhost:3009/api/admin/products'),
      ]);
      setOrders(orderRes.data.data);
      setUsers(userRes.data.data);
      setProducts(productRes.data.data);
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:3009/api/admin/users/${userId}`);
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  if (loading) return <div className={styles.container}>Loading admin data...</div>;

  return (
    <div className={styles.container}>
      <h2>Admin Dashboard</h2>

      <section>
        <h3>All Orders</h3>
        <table>
          <thead>
            <tr>
              <th>Order ID</th><th>User ID</th><th>Total (£)</th><th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.order_id}>
                <td>{o.order_id}</td>
                <td>{o.user_id}</td>
                <td>{o.total_amount.toFixed(2)}</td>
                <td>{new Date(o.estimated_delivery).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Registered Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Email</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.first_name}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h3>Products</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Stock</th><th>Price (£)</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.food_id}>
                <td>{p.food_id}</td>
                <td>{p.name}</td>
                <td>{p.stock}</td>
                <td>{p.current_price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate('/admin/products')}>Manage Products</button>
      </section>
    </div>
  );
};

export default AdminDashboard;
