import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { AuthContext } from '../App';
import axios from 'axios';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      login(res.data);
      setToast({ type: 'success', msg: 'Welcome back!' });
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setToast({ type: 'error', msg: err.response?.data?.message || 'Invalid credentials' });
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
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your NovaBite account.</p>
        <form className="nova-form" onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label"><FiMail style={{ marginRight: '0.4rem' }} />Email *</label>
            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="your@email.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="mb-4">
            <label className="form-label"><FiLock style={{ marginRight: '0.4rem' }} />Password *</label>
            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} placeholder="Enter your password" value={form.password} onChange={e => handleChange('password', e.target.value)} />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <button type="submit" className="btn-nova w-100 mb-3" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
          <p className="text-center" style={{ color: 'var(--text-secondary)' }}>Don't have an account? <Link to="/register">Create one</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
