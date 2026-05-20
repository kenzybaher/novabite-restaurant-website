import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiLogOut } from 'react-icons/fi';
import { CartContext, AuthContext } from '../App';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <nav className={`navbar navbar-expand-lg nova-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">NovaBite</Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${collapsed ? '' : 'show'}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link" to="/" onClick={() => setCollapsed(true)}>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/menu" onClick={() => setCollapsed(true)}>Menu</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/order" onClick={() => setCollapsed(true)}>Order Online</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/reservations" onClick={() => setCollapsed(true)}>Reservations</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/gallery" onClick={() => setCollapsed(true)}>Gallery</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about" onClick={() => setCollapsed(true)}>About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact" onClick={() => setCollapsed(true)}>Contact</NavLink></li>
          </ul>
          <div className="d-flex align-items-center gap-3">
            <Link to="/order" className="text-light position-relative" style={{ fontSize: '1.3rem' }}>
              <FiShoppingCart />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
            {user ? (
              <div className="d-flex align-items-center gap-2">
                <span className="text-light" style={{ fontSize: '0.9rem' }}>{user.name}</span>
                <button onClick={logout} className="btn btn-sm" style={{ color: 'var(--text-secondary)', border: 'none', background: 'none' }}><FiLogOut /></button>
              </div>
            ) : (
              <Link to="/login" className="btn-nova-outline" style={{ padding: '0.4rem 1.2rem', fontSize: '0.9rem' }}>
                <FiUser style={{ marginRight: '0.3rem' }} /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
