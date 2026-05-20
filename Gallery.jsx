import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const images = [
    { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600', label: 'Main Dining Hall' },
    { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600', label: 'Signature Plating' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600', label: 'Chef\'s Special' },
    { src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600', label: 'Private Dining' },
    { src: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600', label: 'Grilled Perfection' },
    { src: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600', label: 'Fresh Seafood' },
    { src: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600', label: 'Craft Cocktails' },
    { src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600', label: 'Bar Lounge' },
    { src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600', label: 'Dessert Art' },
    { src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600', label: 'Outdoor Terrace' },
    { src: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600', label: 'Risotto Creations' },
    { src: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600', label: 'Artisan Soups' }
  ];

  return (
    <>
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}><FiX /></button>
          <img src={images[lightbox].src.replace('w=600', 'w=1200')} alt={images[lightbox].label} onClick={e => e.stopPropagation()} />
        </div>
      )}
      <div className="page-header">
        <div className="container">
          <h1>Our <span className="highlight">Gallery</span></h1>
          <p>A visual journey through our culinary world — ambiance, artistry, and flavor.</p>
        </div>
      </div>
      <section className="section-padding">
        <div className="container">
          <div className="gallery-grid">
            {images.map((img, i) => (
              <div key={i} className="gallery-item animate-in" onClick={() => setLightbox(i)}>
                <img src={img.src} alt={img.label} />
                <div className="overlay"><span>{img.label}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
