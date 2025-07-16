import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for contacting us, ${form.name}!`);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className={styles.contact}>
      <h2>Contact Us</h2>
      <p className={styles.intro}>
        Have a question, suggestion, or just want to say hello? We’d love to hear from you!
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name">Name:</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} required />

        <label htmlFor="message">Message:</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows="5" required />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
