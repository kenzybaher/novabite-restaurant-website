import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import axios from 'axios';

function Footer() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email) { setMsg('Please enter your email'); return; }
    try {
      const res = await axios.post('http://localhost:5000/api/newsletter', { email });
      setMsg(res.data.message);
      setEmail('');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <footer className="nova-footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', background: 'linear-gradient(135deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NovaBite</h5>
            <p>Experience culinary excellence in an atmosphere of modern elegance. Every dish tells a story of passion and craftsmanship.</p>
            <div className="social-icons mt-3">
              <a href="https://www.facebook.com/omar.elhadidi.56"><FiFacebook /></a>
              <a href="https://www.instagram.com/omar_elhadidi_/"><FiInstagram /></a>
              <a href="#"><FiTwitter /></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/order">Order Online</Link></li>
              <li><Link to="/reservations">Reservations</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Contact Info</h5>
            <div className="d-flex align-items-start gap-2 mb-2">
              <FiMapPin style={{ marginTop: '4px', flexShrink: 0, color: 'var(--primary)' }} />
              <span>Arab Academy for Science, Technology & Maritime Transport</span>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <FiPhone style={{ flexShrink: 0, color: 'var(--primary)' }} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="d-flex align-items-center gap-2">
              <FiMail style={{ flexShrink: 0, color: 'var(--primary)' }} />
              <span>hello@novabite.com</span>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Newsletter</h5>
            <p>Subscribe for exclusive offers and updates.</p>
            <form onSubmit={handleNewsletter}>
              <div className="input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
                <button className="btn-nova" type="submit" style={{ borderRadius: '0 8px 8px 0' }}>Subscribe</button>
              </div>
            </form>
            {msg && <small className="d-block mt-2" style={{ color: 'var(--primary)' }}>{msg}</small>}
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} NovaBite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
