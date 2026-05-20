import React, { useState } from 'react';
import { FiPhone, FiMail, FiMapPin, FiClock } from 'react-icons/fi';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email format';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contacts', form);
      setToast({ type: 'success', msg: 'Message sent! We\'ll get back to you shortly.' });
      setForm({ name: '', email: '', subject: '', message: '' });
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

  const contactInfo = [
    { icon: <FiPhone />, title: 'Phone', info: '+1 (555) 123-4567' },
    { icon: <FiMail />, title: 'Email', info: 'hello@novabite.com' },
    { icon: <FiMapPin />, title: 'Address', info: 'Arab Academy for Science, Technology & Maritime Transport' },
    { icon: <FiClock />, title: 'Hours', info: 'Mon-Sun: 11AM - 11PM' }
  ];

  return (
    <>
      {toast && <div className={`nova-toast ${toast.type}`}>{toast.msg}</div>}
      <div className="page-header">
        <div className="container">
          <h1>Get in <span className="highlight">Touch</span></h1>
          <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="row g-4 mb-5">
            {contactInfo.map((c, i) => (
              <div key={i} className="col-lg-3 col-md-6 animate-in">
                <div className="contact-info-card h-100">
                  <div className="icon">{c.icon}</div>
                  <div>
                    <h6>{c.title}</h6>
                    <p>{c.info}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row g-4">
            <div className="col-lg-7">
              <div className="glass-panel">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>Send us a Message</h4>
                <form className="nova-form" onSubmit={handleSubmit} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Your name" value={form.name} onChange={e => handleChange('name', e.target.value)} />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Email *</label>
                      <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="your@email.com" value={form.email} onChange={e => handleChange('email', e.target.value)} />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Subject *</label>
                      <input type="text" className={`form-control ${errors.subject ? 'is-invalid' : ''}`} placeholder="How can we help?" value={form.subject} onChange={e => handleChange('subject', e.target.value)} />
                      {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Message *</label>
                      <textarea className={`form-control ${errors.message ? 'is-invalid' : ''}`} rows="5" placeholder="Your message..." value={form.message} onChange={e => handleChange('message', e.target.value)}></textarea>
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-nova w-100" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="glass-panel h-100 d-flex flex-column">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Find Us</h4>
                <div style={{ flex: 1, minHeight: '300px', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  <iframe
                    title="NovaBite Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.8990995901117!2d30.060860643555003!3d31.308168820348985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1526add103b155ef%3A0xed5db8d49172beb5!2sArab%20Academy%20For%20Science%2C%20Technology%20%26%20Maritime%20Transport!5e0!3m2!1sen!2seg!4v1778941359933!5m2!1sen!2seg"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
