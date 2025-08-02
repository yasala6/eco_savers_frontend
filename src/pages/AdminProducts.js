import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3009/api/admin/products');
      setProducts(res.data.data);
    } catch (err) {
      console.error('Fetch failed', err);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditingId(product.food_id);
    setFormData({ ...product });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    try {
      await axios.put(`http://localhost:3009/api/admin/products/${editingId}`, formData);
      fetchProducts();
      cancelEdit();
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await axios.delete(`http://localhost:3009/api/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  if (loading) return <div className={styles.container}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2>Manage Products</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Qty</th><th>Condition</th><th>Image</th><th>Retailer</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.food_id}>
              <td>{prod.food_id}</td>

              {editingId === prod.food_id ? (
                <>
                  <td>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="current_price"
                      value={formData.current_price}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="quantity_available"
                      value={formData.quantity_available}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      name="condition"
                      value={formData.condition}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <img
                      src={prod.image_url || 'https://via.placeholder.com/60'}
                      alt={prod.name}
                      width="60"
                    />
                  </td>
                  <td>{prod.retailer_name}</td>
                  <td>
                    <button onClick={saveChanges}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{prod.name}</td>
                  <td>£{prod.current_price}</td>
                  <td>{prod.quantity_available}</td>
                  <td>{prod.condition}</td>
                  <td>
                    <img
                      src={prod.image_url || 'https://via.placeholder.com/60'}
                      alt={prod.name}
                      width="60"
                    />
                  </td>
                  <td>{prod.retailer_name}</td>
                  <td>
                    <button onClick={() => startEdit(prod)}>Edit</button>
                    <button onClick={() => deleteProduct(prod.food_id)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
