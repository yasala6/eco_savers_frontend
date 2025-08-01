import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.sidebar}>
      <Link to="/shop">Shop</Link>
      <Link to="/cart">My Cart</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/impact">My Impact</Link>
    </div>
  );
};

export default Sidebar;
