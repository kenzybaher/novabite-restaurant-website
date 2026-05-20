import React, { useState } from 'react';
import { FiCalendar, FiClock, FiUsers } from 'react-icons/fi';
import axios from 'axios';

function Reservations() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', partySize: '', specialRequests: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    else if (!/^[\d\s\-+()]{7,15}$/.test(form.phone)) e.phone = 'Invalid phone format';
    if (!form.date) e.date = 'Date is required';
    else if (new Date(form.date) < new Date(new Date().toDateString())) e.date = 'Date must be in the future';
    if (!form.time) e.time = 'Time is required';
    if (!form.partySize) e.partySize = 'Party size is required';
    else if (form.partySize < 1 || form.partySize > 20) e.partySize = 'Party size must be 1-20';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/reservations', { ...form, partySize: Number(form.partySize) });
      setToast({ type: 'success', msg: 'Reservation confirmed! We look forward to seeing you.' });
      setForm({ name: '', email: '', phone: '', date: '', time: '', partySize: '', specialRequests: '' });
      setErrors({});
    } catch (err) {
      setToast({ type: 'error', msg: err.response?.data?.message || 'Something went wrong' });
    }
    setLoading(false);
    setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <>
      {toast && <div className={`nova-toast ${toast.type}`}>{toast.msg}</div>}
      <div className="page-header">
        <div className="container">
          <h1>Make a <span className="highlight">Reservation</span></h1>
          <p>Book your table and let us create an unforgettable dining experience for you.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-lg-4">
              <div className="glass-panel h-100">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem', color: 'var(--primary)' }}>Dining Hours</h4>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="feature-icon" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}><FiCalendar /></div>
                  <div><strong>Mon — Fri</strong><br /><span style={{ color: 'var(--text-secondary)' }}>11:00 AM — 11:00 PM</span></div>
                </div>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="feature-icon" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}><FiClock /></div>
                  <div><strong>Sat — Sun</strong><br /><span style={{ color: 'var(--text-secondary)' }}>10:00 AM — 12:00 AM</span></div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="feature-icon" style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}><FiUsers /></div>
                  <div><strong>Party Size</strong><br /><span style={{ color: 'var(--text-secondary)' }}>Up to 20 guests</span></div>
                </div>
                <hr style={{ borderColor: 'var(--glass-border)', margin: '2rem 0' }} />
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>For parties larger than 20, please call us directly at <strong style={{ color: 'var(--primary)' }}>+1 (555) 123-4567</strong></p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="glass-panel">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Reserve Your Table</h4>
                <form className="nova-form" onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="John Doe" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="john@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone *</label>
                      <input type="tel" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Party Size *</label>
                      <select className={`form-select ${errors.partySize ? 'is-invalid' : ''}`} value={form.partySize} onChange={e => handleChange('partySize', e.target.value)}>
                        <option value="">Select</option>
                        {[...Array(20)].map((_, i) => <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                      {errors.partySize && <div className="invalid-feedback">{errors.partySize}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Date *</label>
                      <input type="date" className={`form-control ${errors.date ? 'is-invalid' : ''}`} value={form.date} onChange={e => handleChange('date', e.target.value)} />
                      {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Time *</label>
                      <select className={`form-select ${errors.time ? 'is-invalid' : ''}`} value={form.time} onChange={e => handleChange('time', e.target.value)}>
                        <option value="">Select</option>
                        {['11:00 AM','11:30 AM','12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM','8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Special Requests</label>
                      <textarea className="form-control" rows="3" placeholder="Allergies, special occasions, seating preferences..." value={form.specialRequests} onChange={e => handleChange('specialRequests', e.target.value)}></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-nova w-100" disabled={loading}>{loading ? 'Booking...' : 'Confirm Reservation'}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Reservations;
