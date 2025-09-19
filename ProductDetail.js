import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { products } from '../data/products';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Find the product from all categories
  const product = Object.values(products)
    .flat()
    .find(p => p.id === parseInt(productId));

  useEffect(() => {
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="product-not-found">
          <h2>Product Not Found</h2>
          <button onClick={() => navigate('/')} className="back-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.warning('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Use product data for reviews and features, fallback to defaults if not available
  const reviews = product.reviews || [
    {
      id: 1,
      user: 'Customer',
      rating: 4,
      comment: 'Great product quality and fit!',
      date: '2025-01-15'
    }
  ];

  const keyFeatures = product.keyFeatures || [
    'Premium quality material',
    'Comfortable fit',
    'Easy to maintain',
    'Durable construction',
    'Trendy design',
    'Multiple color options'
  ];

  const productImage = product.image;

  const handleImageError = (e) => {
    console.log(`Image failed to load for product ${product.id}: ${product.title}`);
    console.log(`Failed image URL: ${product.image}`);
    // Fallback to a reliable image
    e.target.src = 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop&crop=center';
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <h1>Product Details</h1>
      </div>

      <div className="product-detail-content">
        {/* Product Images */}
        <div className="product-images">
          <div className="main-image">
            <img
              src={productImage}
              alt={product.title}
              onError={handleImageError}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-detail">
          <div className="product-brand">{product.brand}</div>
          <h2 className="product-title">{product.title}</h2>
          
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map(star => {
                const avgRating = reviews.length > 0 
                  ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
                  : 0;
                return (
                  <span key={star} className={star <= avgRating ? 'star filled' : 'star'}>
                    ⭐
                  </span>
                );
              })}
            </div>
            <span className="rating-text">
              {reviews.length > 0 
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                : '0'
              } out of 5
            </span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>

          <div className="product-price-detail">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <>
                <span className="original-price">₹{product.originalPrice}</span>
                <span className="discount-badge">{discountPercentage}% OFF</span>
              </>
            )}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          {/* Size Selection */}
          <div className="product-options">
            <div className="option-group">
              <label>Size:</label>
              <div className="option-buttons">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`option-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="option-group">
              <label>Color:</label>
              <div className="option-buttons">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`option-btn ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="option-group">
              <label>Quantity:</label>
              <div className="quantity-selector">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="product-actions-detail">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
            <button 
              className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={handleToggleWishlist}
            >
              {isInWishlist(product.id) ? '❤️ Added to Wishlist' : '🤍 Add to Wishlist'}
            </button>
          </div>

          {/* Key Features */}
          <div className="key-features">
            <h3>Key Features</h3>
            <ul>
              {keyFeatures.map((feature, index) => (
                <li key={index}>✓ {feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        <div className="reviews-container">
          {reviews.map(review => (
            <div key={review.id} className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">{review.user}</span>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map(star => (
                      <span key={star} className={star <= review.rating ? 'star filled' : 'star'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
                <span className="review-date">{review.date}</span>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;