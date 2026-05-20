import React from 'react';

function About() {
  const stats = [
    { number: '12+', label: 'Years of Excellence' },
    { number: '50+', label: 'Signature Dishes' },
    { number: '15K+', label: 'Happy Guests' },
    { number: '8', label: 'Industry Awards' }
  ];

  const team = [
    { name: 'Chef Marco Bellini', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300', desc: 'Trained in Milan and Paris, Chef Marco brings 20 years of culinary mastery.' },
    { name: 'Sofia Laurent', role: 'Pastry Chef', img: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=300', desc: 'Award-winning pastry artist known for inventive dessert creations.' },
    { name: 'James Rivera', role: 'Sommelier', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300', desc: 'Certified sommelier with an exquisite palate for the perfect pairing.' },
    { name: 'Aria Nakamura', role: 'Sous Chef', img: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=300', desc: 'Fusion cuisine specialist blending Eastern and Western flavors.' }
  ];

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>About <span className="highlight">NovaBite</span></h1>
          <p>Our journey from a small kitchen to a culinary landmark.</p>
        </div>
      </div>

      {/* Story */}
      <section className="section-padding">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600" alt="Restaurant Interior" style={{ borderRadius: 'var(--radius-lg)', width: '100%', height: '400px', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }} />
            </div>
            <div className="col-lg-6">
              <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>Our <span className="highlight">Story</span></h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Founded in 2012, NovaBite was born from a simple belief: exceptional food should be more than just a meal — it should be an experience that touches all the senses.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Chef Marco Bellini, after years of honing his craft in the kitchens of Milan and Paris, envisioned a restaurant that would bridge classic European technique with bold, modern flavors. The result is NovaBite — a place where tradition meets innovation on every plate.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Today, we continue to push boundaries while staying true to our roots: sourcing the finest local ingredients, crafting each dish with meticulous care, and creating an atmosphere that makes every guest feel at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, rgba(22,33,62,0.3) 0%, transparent 100%)' }}>
        <div className="container">
          <div className="row g-4">
            {stats.map((s, i) => (
              <div key={i} className="col-6 col-md-3 animate-in">
                <div className="stat-item">
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container">
          <h2 className="section-title">Meet Our <span className="highlight">Team</span></h2>
          <p className="section-subtitle">The passionate people behind every unforgettable meal.</p>
          <div className="row g-4">
            {team.map((t, i) => (
              <div key={i} className="col-lg-3 col-md-6 animate-in">
                <div className="team-card h-100">
                  <img src={t.img} alt={t.name} />
                  <h5>{t.name}</h5>
                  <div className="role">{t.role}</div>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'linear-gradient(135deg, rgba(212,163,115,0.05), rgba(224,122,95,0.05))' }}>
        <div className="container">
          <h2 className="section-title">Our <span className="highlight">Values</span></h2>
          <p className="section-subtitle">The principles that guide everything we do.</p>
          <div className="row g-4">
            {[
              { title: 'Quality First', desc: 'We never compromise on ingredients. Every component is sourced from trusted suppliers who share our commitment to excellence.' },
              { title: 'Sustainability', desc: 'From farm-to-table practices to minimizing food waste, we strive to operate responsibly and protect our planet.' },
              { title: 'Community', desc: 'We believe in giving back. We support local farmers, host charity events, and invest in the next generation of chefs.' }
            ].map((v, i) => (
              <div key={i} className="col-md-4 animate-in">
                <div className="glass-panel h-100 text-center">
                  <h4 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary)', marginBottom: '1rem' }}>{v.title}</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
