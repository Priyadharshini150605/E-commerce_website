import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Fashion Shop</h3>
            <ul>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">Store Locator</Link></li>
              <li><Link to="#">Careers</Link></li>
              <li><Link to="#">Press</Link></li>
              <li><Link to="#">Investor Relations</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="#">Track Order</Link></li>
              <li><Link to="#">FAQs</Link></li>
              <li><Link to="#">Customer Support</Link></li>
              <li><Link to="#">Returns & Exchange</Link></li>
              <li><Link to="#">Shipping Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Shopping</h3>
            <ul>
              <li><Link to="/women">Women</Link></li>
              <li><Link to="/men">Men</Link></li>
              <li><Link to="/kids">Kids</Link></li>
              <li><Link to="#">Beauty</Link></li>
              <li><Link to="#">Home & Living</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Connect With Us</h3>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
            <div style={{ marginTop: '15px' }}>
              <p style={{ fontSize: '14px', marginBottom: '10px' }}>Subscribe to our newsletter</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  style={{ 
                    flex: 1, 
                    padding: '8px 12px', 
                    borderRadius: '4px', 
                    border: '1px solid #555',
                    background: '#34495e',
                    color: 'white'
                  }}
                />
                <button 
                  className="btn btn-primary"
                  style={{ padding: '8px 16px', fontSize: '12px' }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Fashion Shop. All Rights Reserved.</p>
          <div style={{ marginTop: '10px' }}>
            <Link to="#" style={{ color: '#bdc3c7', marginRight: '20px' }}>Privacy Policy</Link>
            <Link to="#" style={{ color: '#bdc3c7', marginRight: '20px' }}>Terms & Conditions</Link>
            <Link to="#" style={{ color: '#bdc3c7' }}>Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;