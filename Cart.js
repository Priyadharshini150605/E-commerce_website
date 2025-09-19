import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartItemsCount } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div style={{ padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <div style={{
            background: 'white',
            padding: '60px 40px',
            borderRadius: '12px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <i className="fas fa-shopping-cart" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></i>
            <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Your Cart is Empty</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/women" className="btn btn-primary" style={{ marginRight: '10px' }}>
              Shop Women
            </Link>
            <Link to="/men" className="btn btn-outline">
              Shop Men
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
          Shopping Cart ({getCartItemsCount()} items)
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '30px' }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
              overflow: 'hidden'
            }}>
              {cartItems.map((item, index) => (
                <div key={item.id}>
                  <div className="cart-item">
                    <div className="item-image">
                      {item.image ? (
                        <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className="fas fa-image" style={{ fontSize: '32px' }}></i>
                      )}
                    </div>
                    
                    <div className="item-details">
                      <div className="item-title">{item.title}</div>
                      <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                        Brand: {item.brand}
                      </div>
                      <div className="item-price">₹{item.price}</div>
                      
                      <div className="quantity-controls">
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input 
                          type="number"
                          className="qty-input"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          min="1"
                        />
                        <button 
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <i className="fas fa-trash"></i> Remove
                      </button>
                    </div>
                  </div>
                  {index < cartItems.length - 1 && <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #eee' }} />}
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div style={{ marginTop: '20px' }}>
              <Link to="/" className="btn btn-outline">
                <i className="fas fa-arrow-left"></i> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
              Order Summary
            </h3>
            
            <div className="summary-item">
              <span>Subtotal ({getCartItemsCount()} items)</span>
              <span>₹{getCartTotal().toLocaleString()}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping</span>
              <span style={{ color: '#27ae60' }}>FREE</span>
            </div>
            
            <div className="summary-item">
              <span>Tax</span>
              <span>₹{Math.round(getCartTotal() * 0.18).toLocaleString()}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>₹{(getCartTotal() + Math.round(getCartTotal() * 0.18)).toLocaleString()}</span>
            </div>

            {/* Promo Code */}
            <div style={{ margin: '20px 0' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text"
                  placeholder="Enter promo code"
                  className="form-input"
                  style={{ flex: 1 }}
                />
                <button className="btn btn-outline">Apply</button>
              </div>
            </div>

            {/* Checkout Button */}
            {user ? (
              <Link 
                to="/billing" 
                className="btn btn-primary"
                style={{ width: '100%', textAlign: 'center' }}
              >
                Proceed to Checkout
              </Link>
            ) : (
              <div>
                <Link 
                  to="/login" 
                  className="btn btn-primary"
                  style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}
                >
                  Login to Checkout
                </Link>
                <p style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
                  New customer? <Link to="/signup" style={{ color: '#667eea' }}>Create an account</Link>
                </p>
              </div>
            )}

            {/* Security & Delivery Info */}
            <div style={{ marginTop: '30px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <i className="fas fa-shield-alt" style={{ color: '#27ae60' }}></i>
                <span style={{ fontSize: '14px' }}>Secure checkout with SSL encryption</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <i className="fas fa-truck" style={{ color: '#667eea' }}></i>
                <span style={{ fontSize: '14px' }}>Free delivery on orders above ₹999</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-undo" style={{ color: '#ff4757' }}></i>
                <span style={{ fontSize: '14px' }}>Easy 30-day returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;