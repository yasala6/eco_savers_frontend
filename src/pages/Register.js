import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Welcome ${form.name}, you have registered successfully!`);
    navigate('/login');
  };

  return (
    <div className={styles.registerContainer}>
      <h2>Create Your EcoSavers Account</h2>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <label>Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label>Password:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
