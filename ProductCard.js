import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleAddToCart = () => {
    // Navigate to product detail page instead of directly adding to cart
    // This ensures user can select size and color
    navigate(`/product/${product.id}`);
    toast.info('Please select size and color to add to cart');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleImageError = (e) => {
    console.log(`Image failed to load for product ${product.id}: ${product.title}`);
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
        {product.image && !imageError ? (
          <img 
            src={product.image} 
            alt={product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="image-placeholder">
            <div className="placeholder-icon">👕</div>
            <div className="placeholder-text">Image</div>
            {imageError && (
              <div style={{ fontSize: '10px', color: '#999', marginTop: '5px' }}>
                Failed to load
              </div>
            )}
          </div>
        )}
        {imageLoading && !imageError && (
          <div className="image-loading">
            <div className="loading-spinner">⏳</div>
          </div>
        )}
        <div className="product-actions">
          <button 
            className={`action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist();
            }}
            title="Add to Wishlist"
          >
            ❤️
          </button>
          <button 
            className="action-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            title="Add to Cart"
          >
            🛒
          </button>
        </div>
      </div>
      
      <div className="product-info" onClick={handleProductClick} style={{ cursor: 'pointer' }}>
        <div className="product-brand">{product.brand}</div>
        <div className="product-title">{product.title}</div>
        <div className="product-price">
          <span className="current-price">₹{product.price}</span>
          {product.originalPrice && (
            <>
              <span className="original-price">₹{product.originalPrice}</span>
              <span className="discount">({discountPercentage}% OFF)</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;