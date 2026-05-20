import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiClock, FiAward, FiHeart, FiArrowRight } from 'react-icons/fi';
import { RiDoubleQuotesR } from 'react-icons/ri';
import axios from 'axios';

function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu/featured')
      .then(res => setFeatured(res.data))
      .catch(() => {});
  }, []);

  const features = [
    { icon: <FiStar />, title: 'Premium Quality', desc: 'Only the finest ingredients sourced from trusted local suppliers.' },
    { icon: <FiClock />, title: 'Fast Delivery', desc: 'Hot meals delivered to your doorstep within 30 minutes.' },
    { icon: <FiAward />, title: 'Award Winning', desc: 'Recognized as the best fine dining restaurant 3 years running.' },
    { icon: <FiHeart />, title: 'Made with Love', desc: 'Every dish is handcrafted by our passionate culinary team.' }
  ];

  const testimonials = [
    { name: 'Sarah Mitchell', role: 'Food Critic', text: 'NovaBite redefines fine dining. The truffle burrata alone is worth the visit — an exquisite blend of flavors and textures.', stars: 5 },
    { name: 'James Romano', role: 'Regular Guest', text: 'We celebrate every anniversary here. The ambiance, the service, the food — everything is consistently extraordinary.', stars: 5 },
    { name: 'Emily Chen', role: 'Travel Blogger', text: 'Best restaurant I visited this year. The pan-seared salmon was perfection and the staff made us feel like royalty.', stars: 5 }
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="hero-title animate-in">
                Discover the Art of<br />
                <span className="highlight">Exceptional Dining</span>
              </h1>
              <p className="hero-subtitle animate-in">
                Where culinary passion meets modern elegance. Experience flavors that tell a story at NovaBite.
              </p>
              <div className="d-flex gap-3 flex-wrap animate-in">
                <Link to="/menu" className="btn-nova">Explore Menu <FiArrowRight style={{ marginLeft: '0.5rem' }} /></Link>
                <Link to="/reservations" className="btn-nova-outline">Book a Table</Link>
              </div>
              <div className="d-flex gap-4 mt-4 animate-in">
                <div><span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>12+</span><br /><small style={{ color: 'var(--text-secondary)' }}>Years Experience</small></div>
                <div><span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>50+</span><br /><small style={{ color: 'var(--text-secondary)' }}>Signature Dishes</small></div>
                <div><span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>15K+</span><br /><small style={{ color: 'var(--text-secondary)' }}>Happy Guests</small></div>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block text-center">
              <div style={{ position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"
                  alt="Featured Dish"
                  style={{ borderRadius: '50%', width: '400px', height: '400px', objectFit: 'cover', border: '4px solid rgba(212,163,115,0.3)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                />
                <div style={{ position: 'absolute', bottom: '30px', left: '-40px', background: 'var(--glass)', backdropFilter: 'blur(10px)', borderRadius: 'var(--radius)', padding: '1rem 1.5rem', border: '1px solid var(--glass-border)' }}>
                  <div className="d-flex align-items-center gap-2">
                    <FiAward style={{ color: 'var(--primary)', fontSize: '1.5rem' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Best Restaurant</div>
                      <small style={{ color: 'var(--text-secondary)' }}>NYC Awards 2024</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Our <span className="highlight">Signature</span> Dishes</h2>
          <p className="section-subtitle">Handcrafted with premium ingredients, each dish is a masterpiece of flavor and presentation.</p>
          <div className="row g-4">
            {featured.slice(0, 6).map((item, i) => (
              <div key={item._id || i} className="col-lg-4 col-md-6 animate-in">
                <div className="nova-card h-100">
                  <div className="card-img-wrapper">
                    <img src={item.image} className="card-img-top" alt={item.name} />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{item.name}</h5>
                      <span className="card-price">${item.price}</span>
                    </div>
                    <p className="card-text flex-grow-1">{item.description}</p>
                    <span style={{ display: 'inline-block', background: 'rgba(212,163,115,0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', textTransform: 'capitalize', width: 'fit-content' }}>{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/menu" className="btn-nova">View Full Menu <FiArrowRight style={{ marginLeft: '0.5rem' }} /></Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, rgba(22,33,62,0.3) 0%, transparent 100%)' }}>
        <div className="container">
          <h2 className="section-title">Why Choose <span className="highlight">NovaBite</span></h2>
          <p className="section-subtitle">We deliver more than food — we create memorable experiences.</p>
          <div className="row g-4">
            {features.map((f, i) => (
              <div key={i} className="col-lg-3 col-md-6 text-center animate-in">
                <div className="feature-icon mx-auto">{f.icon}</div>
                <h5 style={{ fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>{f.title}</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">What Our <span className="highlight">Guests</span> Say</h2>
          <p className="section-subtitle">Real stories from real people who experienced the NovaBite difference.</p>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div key={i} className="col-lg-4 col-md-6 animate-in">
                <div className="testimonial-card h-100">
                  <RiDoubleQuotesR className="quote-icon" />
                  <div className="stars">{'★'.repeat(t.stars)}</div>
                  <p>"{t.text}"</p>
                  <div className="author">{t.name}</div>
                  <div className="role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center" style={{ background: 'linear-gradient(135deg, rgba(212,163,115,0.08), rgba(224,122,95,0.08))' }}>
        <div className="container">
          <h2 className="section-title">Ready for an <span className="highlight">Unforgettable</span> Experience?</h2>
          <p className="section-subtitle">Reserve your table today and let us take care of the rest.</p>
          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/reservations" className="btn-nova">Book a Table</Link>
            <Link to="/order" className="btn-nova-outline">Order Online</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
