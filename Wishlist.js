import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
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
            <i className="fas fa-heart" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></i>
            <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>Your Wishlist is Empty</h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>
              Save items you love to your wishlist and never lose track of them.
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
            My Wishlist ({wishlistItems.length} items)
          </h1>
          <Link to="/" className="btn btn-outline">
            <i className="fas fa-arrow-left"></i> Continue Shopping
          </Link>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          {wishlistItems.map((item, index) => (
            <div key={item.id}>
              <div className="wishlist-item">
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
                  <div className="item-price">
                    ₹{item.price}
                    {item.originalPrice && (
                      <span style={{ 
                        marginLeft: '10px', 
                        fontSize: '14px', 
                        color: '#999', 
                        textDecoration: 'line-through' 
                      }}>
                        ₹{item.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {item.originalPrice && (
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#27ae60', 
                      fontWeight: '500',
                      marginTop: '5px'
                    }}>
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </div>
                  )}

                  {/* Size and Color Options */}
                  {item.sizes && item.sizes.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>Available Sizes: </span>
                      {item.sizes.slice(0, 4).map((size, idx) => (
                        <span key={idx} style={{ 
                          fontSize: '12px', 
                          background: '#f8f9fa', 
                          padding: '2px 6px', 
                          borderRadius: '3px',
                          marginRight: '5px'
                        }}>
                          {size}
                        </span>
                      ))}
                      {item.sizes.length > 4 && <span style={{ fontSize: '12px', color: '#666' }}>+{item.sizes.length - 4} more</span>}
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end' }}>
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleMoveToCart(item)}
                    style={{ fontSize: '14px', padding: '8px 16px' }}
                  >
                    <i className="fas fa-shopping-cart"></i> Move to Cart
                  </button>
                  
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                    style={{ fontSize: '12px' }}
                  >
                    <i className="fas fa-heart-broken"></i> Remove
                  </button>
                </div>
              </div>
              {index < wishlistItems.length - 1 && <hr style={{ margin: 0, border: 'none', borderTop: '1px solid #eee' }} />}
            </div>
          ))}
        </div>

        {/* Wishlist Actions */}
        <div style={{ 
          marginTop: '30px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <div>
            <h3 style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
              Love everything in your wishlist?
            </h3>
            <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
              Move all items to cart and proceed to checkout
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-outline"
              onClick={() => {
                wishlistItems.forEach(item => {
                  addToCart(item);
                  removeFromWishlist(item.id);
                });
              }}
            >
              Move All to Cart
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
                  wishlistItems.forEach(item => removeFromWishlist(item.id));
                }
              }}
            >
              Clear Wishlist
            </button>
          </div>
        </div>

        {/* Recommendations */}
        <div style={{ marginTop: '40px' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
            You might also like
          </h3>
          <div style={{
            display: 'flex',
            gap: '15px',
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <Link to="/women" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
              Explore Women's Collection
            </Link>
            <Link to="/men" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
              Explore Men's Collection
            </Link>
            <Link to="/kids" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
              Explore Kids' Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;