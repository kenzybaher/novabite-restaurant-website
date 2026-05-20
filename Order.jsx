import React, { useState, useEffect, useContext } from 'react';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart, FiX } from 'react-icons/fi';
import { CartContext } from '../App';
import axios from 'axios';

function Order() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [showCheckout, setShowCheckout] = useState(false);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useContext(CartContext);
  const [form, setForm] = useState({ customerName: '', customerEmail: '', customerPhone: '', address: '', notes: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = category === 'all' ? 'http://localhost:5000/api/menu' : `http://localhost:5000/api/menu?category=${category}`;
    axios.get(url).then(r => { setItems(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, [category]);

  const categories = ['all', 'appetizers', 'mains', 'desserts', 'drinks'];

  const handleAdd = (item) => {
    addToCart(item);
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 800);
  };

  const validate = () => {
    const e = {};
    if (!form.customerName.trim()) e.customerName = 'Name is required';
    if (!form.customerEmail.trim()) e.customerEmail = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.customerEmail)) e.customerEmail = 'Invalid email';
    if (!form.customerPhone.trim()) e.customerPhone = 'Phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (cartItems.length === 0) { setToast({ type: 'error', msg: 'Your cart is empty!' }); setTimeout(() => setToast(null), 3000); return; }
    setSubmitting(true);
    try {
      const orderItems = cartItems.map(i => ({ menuItem: i._id, name: i.name, price: i.price, quantity: i.quantity }));
      await axios.post('http://localhost:5000/api/orders', { ...form, items: orderItems, totalAmount: cartTotal });
      setToast({ type: 'success', msg: 'Order placed successfully! Your food is being prepared.' });
      clearCart();
      setForm({ customerName: '', customerEmail: '', customerPhone: '', address: '', notes: '' });
      setShowCheckout(false);
    } catch (err) {
      setToast({ type: 'error', msg: err.response?.data?.message || 'Failed to place order' });
    }
    setSubmitting(false);
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <>
      {toast && <div className={`nova-toast ${toast.type}`}>{toast.msg}</div>}
      <div className="page-header">
        <div className="container">
          <h1>Order <span className="highlight">Online</span></h1>
          <p>Add items to your cart and enjoy NovaBite from the comfort of your home.</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {/* Menu items */}
            <div className="col-lg-8">
              <div className="filter-tabs" style={{ justifyContent: 'flex-start' }}>
                {categories.map(c => (
                  <button key={c} className={`filter-tab ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                    {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
              {loading ? (
                <div className="text-center py-5"><div className="spinner-border" style={{ color: 'var(--primary)' }}><span className="visually-hidden">Loading...</span></div></div>
              ) : (
                <div className="row g-3">
                  {items.map((item, i) => (
                    <div key={item._id || i} className="col-md-6">
                      <div className="nova-card" style={{ display: 'flex', flexDirection: 'row', minHeight: '150px' }}>
                        <img src={item.image} alt={item.name} style={{ width: '140px', minHeight: '100%', objectFit: 'cover', flexShrink: 0 }} />
                        <div className="card-body d-flex flex-column justify-content-between p-3" style={{ flex: 1 }}>
                          <div>
                            <h6 style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', margin: 0 }}>{item.name}</h6>
                            <small style={{ color: 'var(--text-muted)' }}>{item.description?.slice(0, 60)}...</small>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="card-price" style={{ fontSize: '1.1rem' }}>${item.price}</span>
                            <button className="btn-nova" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }} onClick={() => handleAdd(item)}>
                              <FiPlus /> {addedId === item._id ? '✓' : 'Add'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart sidebar */}
            <div className="col-lg-4">
              <div className="glass-panel" style={{ position: 'sticky', top: '100px' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
                  <FiShoppingCart style={{ marginRight: '0.5rem' }} /> Your Cart
                </h4>
                {cartItems.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem 0' }}>Your cart is empty</p>
                ) : (
                  <>
                    {cartItems.map(item => (
                      <div key={item._id} className="d-flex align-items-center gap-2 py-2" style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</div>
                          <small style={{ color: 'var(--primary)' }}>${(item.price * item.quantity).toFixed(2)}</small>
                        </div>
                        <div className="cart-item-qty">
                          <button onClick={() => updateQuantity(item._id, item.quantity - 1)}><FiMinus size={12} /></button>
                          <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.quantity + 1)}><FiPlus size={12} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}><FiTrash2 size={14} /></button>
                      </div>
                    ))}
                    <div className="cart-total mt-3">
                      <span>Total</span>
                      <span className="amount">${cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="btn-nova w-100" onClick={() => setShowCheckout(true)}>Proceed to Checkout</button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {showCheckout && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-panel" style={{ maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setShowCheckout(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.3rem' }}><FiX /></button>
            <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Checkout</h4>
            <form className="nova-form" onSubmit={handleOrder} noValidate>
              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input type="text" className={`form-control ${errors.customerName ? 'is-invalid' : ''}`} value={form.customerName} onChange={e => handleChange('customerName', e.target.value)} />
                {errors.customerName && <div className="invalid-feedback">{errors.customerName}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Email *</label>
                <input type="email" className={`form-control ${errors.customerEmail ? 'is-invalid' : ''}`} value={form.customerEmail} onChange={e => handleChange('customerEmail', e.target.value)} />
                {errors.customerEmail && <div className="invalid-feedback">{errors.customerEmail}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Phone *</label>
                <input type="tel" className={`form-control ${errors.customerPhone ? 'is-invalid' : ''}`} value={form.customerPhone} onChange={e => handleChange('customerPhone', e.target.value)} />
                {errors.customerPhone && <div className="invalid-feedback">{errors.customerPhone}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Delivery Address *</label>
                <textarea className={`form-control ${errors.address ? 'is-invalid' : ''}`} rows="2" value={form.address} onChange={e => handleChange('address', e.target.value)}></textarea>
                {errors.address && <div className="invalid-feedback">{errors.address}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Order Notes</label>
                <textarea className="form-control" rows="2" placeholder="Any special instructions..." value={form.notes} onChange={e => handleChange('notes', e.target.value)}></textarea>
              </div>
              <div className="cart-total mb-3"><span>Total</span><span className="amount">${cartTotal.toFixed(2)}</span></div>
              <button type="submit" className="btn-nova w-100" disabled={submitting}>{submitting ? 'Placing Order...' : 'Place Order'}</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Order;
