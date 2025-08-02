import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';
import styles from './App.module.css';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';

function App() {
  const { user } = useAuth();

  return (
    <div className={styles.appContainer}>
      <Navbar />
      <div className={styles.mainLayout}>
        {user && <Sidebar />}
        <div className={styles.pageContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts/>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
