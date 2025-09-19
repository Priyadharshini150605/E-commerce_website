import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
    navigate('/');
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="flex justify-between items-center">
            
            <div className="flex items-center space-x-10">
              
            </div>
          </div>
        </div>
      </div>
      
      <div className="header-main">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              Fashion Shop
            </Link>
            
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <i className="fas fa-search"></i>
              </button>
            </form>
            
            <div className="header-actions">
              <div className="user-menu">
                {user ? (
                  <>
                    <button 
                      className="user-btn"
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                    >
                      <i className="fas fa-user"></i>
                      <span>Hi, {user.name}</span>
                      <i className="fas fa-chevron-down"></i>
                    </button>
                    {showUserDropdown && (
                      <div className="user-dropdown">
                        <Link to="/profile" onClick={() => setShowUserDropdown(false)}>
                          My Profile
                        </Link>
                        <Link to="/orders" onClick={() => setShowUserDropdown(false)}>
                          My Orders
                        </Link>
                        <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', padding: '12px 15px', color: '#333' }}>
                          Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to="/login" className="user-btn">
                    <i className="fas fa-user"></i>
                    <span>Login</span>
                  </Link>
                )}
              </div>
              
              <Link to="/wishlist" className="wishlist-btn">
                <i className="fas fa-heart"></i>
                <span>Wishlist</span>
                {wishlistItems.length > 0 && (
                  <span className="badge">{wishlistItems.length}</span>
                )}
              </Link>
              
              <Link to="/cart" className="cart-btn">
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
                {getCartItemsCount() > 0 && (
                  <span className="badge">{getCartItemsCount()}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <nav className="navigation">
        <div className="container">
          <div className="nav-links">
            <Link 
              to="/women" 
              className={`nav-link ${isActiveLink('/women') ? 'active' : ''}`}
            >
              WOMEN
            </Link>
            <Link 
              to="/men" 
              className={`nav-link ${isActiveLink('/men') ? 'active' : ''}`}
            >
              MEN
            </Link>
            <Link 
              to="/kids" 
              className={`nav-link ${isActiveLink('/kids') ? 'active' : ''}`}
            >
              KIDS
            </Link>
           
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;