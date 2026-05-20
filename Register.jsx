import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { AuthContext } from '../App';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name, email: form.email, password: form.password, phone: form.phone
      });
      login(res.data);
      setToast({ type: 'success', msg: 'Account created successfully!' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToast({ type: 'error', msg: err.response?.data?.message || 'Registration failed' });
    }
    setLoading(false);
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (field, val) => {
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="auth-page">
      {toast && <div className={`nova-toast ${toast.type}`}>{toast.msg}</div>}
      <div className="auth-card">
        <div className="text-center mb-3">
          <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NovaBite</Link>
        </div>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join NovaBite for exclusive perks and easy ordering.</p>
        <form className="nova-form" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label"><FiUser style={{ marginRight: '0.4rem' }} />Full Name *</label>
            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="John Doe" value={form.name} onChange={e => handleChange('name', e.target.value)} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label"><FiMail style={{ marginRight: '0.4rem' }} />Email *</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="john@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label"><FiPhone style={{ marginRight: '0.4rem' }} />Phone</label>
            <input type="tel" className="form-control" placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label"><FiLock style={{ marginRight: '0.4rem' }} />Password *</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Min. 6 characters" value={form.password} onChange={e => handleChange('password', e.target.value)} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label"><FiLock style={{ marginRight: '0.4rem' }} />Confirm Password *</label>
            <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} placeholder="Repeat password" value={form.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)} />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="btn-nova w-100 mb-3" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
          <p className="text-center" style={{ color: 'var(--text-secondary)' }}>Already have an account? <Link to="/login">Sign In</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
