import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobileNo: '',
    address: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:3009/eco_savers/autenticate/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.status === 201) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Create Your EcoSavers Account</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>

        <div className={styles.row}>
          <input name="userName" placeholder="Username" value={form.userName} onChange={handleChange} required />
          <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        </div>

        <div className={styles.row}>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input name="mobileNo" placeholder="Mobile No" value={form.mobileNo} onChange={handleChange} required />
        </div>

        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
