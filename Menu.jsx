import React, { useState, useEffect, useContext } from 'react';
import { FiPlus } from 'react-icons/fi';
import { CartContext } from '../App';
import axios from 'axios';

function Menu() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = category === 'all' ? 'http://localhost:5000/api/menu' : `http://localhost:5000/api/menu?category=${category}`;
    axios.get(url)
      .then(res => { setItems(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category]);

  const categories = ['all', 'appetizers', 'mains', 'desserts', 'drinks'];

  const handleAdd = (item) => {
    addToCart(item);
    setAddedId(item._id);
    setTimeout(() => setAddedId(null), 1000);
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Our <span className="highlight">Menu</span></h1>
          <p>Explore our carefully curated selection of dishes, crafted with the finest ingredients.</p>
        </div>
      </div>

      <section className="section-padding">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(c => (
              <button key={c} className={`filter-tab ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>
                {c === 'all' ? 'All' : c.charAt(0).toUpperCase() + c.slice(1)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: 'var(--primary)' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {items.map((item, i) => (
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
                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <span style={{ background: 'rgba(212,163,115,0.1)', color: 'var(--primary)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', textTransform: 'capitalize' }}>{item.category}</span>
                        <button
                          className="btn-nova d-flex align-items-center gap-1"
                          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                          onClick={() => handleAdd(item)}
                        >
                          <FiPlus /> {addedId === item._id ? 'Added!' : 'Add to Cart'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && items.length === 0 && (
            <div className="text-center py-5">
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>No items found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Menu;
