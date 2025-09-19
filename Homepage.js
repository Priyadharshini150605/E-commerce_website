import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Homepage = () => {
  // Get featured products from actual products data
  const featuredProducts = [
    products.women[0], // Elegant Floral Dress
    products.men[0],   // Formal Cotton Shirt
    products.kids[0],  // Cotton Dress for Girls
    products.women[4], // Party Wear Gown
    products.men[3],   // Sports Track Suit
    products.kids[2]   // Denim Dungarees
  ];

  const categories = [
    {
      title: 'WOMEN',
      subtitle: 'Discover the latest trends',
      link: '/women',
      icon: '👗'
    },
    {
      title: 'MEN',
      subtitle: 'Style that speaks',
      link: '/men',
      icon: '👔'
    },
    {
      title: 'KIDS',
      subtitle: 'Fun & comfortable fashion',
      link: '/kids',
      icon: '👶'
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
            Welcome to Fashion Shop
          </h1>
          <p style={{ fontSize: '20px', marginBottom: '30px', opacity: '0.9' }}>
            Discover the latest trends in fashion for everyone
          </p>
          <Link to="/women" className="btn btn-primary" style={{ 
            padding: '15px 30px', 
            fontSize: '18px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid white',
            color: 'white'
          }}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: '#333' }}>
            Shop by Category
          </h2>
          <div className="grid grid-3">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={category.link}
                className="card"
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'transparent';
                  e.target.style.background = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
                  e.target.style.color = 'inherit';
                }}
              >
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                    {category.icon}
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
                    {category.title}
                  </h3>
                  <p style={{ fontSize: '16px', opacity: '0.7' }}>
                    {category.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: '60px 0', background: '#f8f9fa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', color: '#333', marginBottom: '10px' }}>
              Featured Products
            </h2>
            <p style={{ fontSize: '16px', color: '#666' }}>
              Handpicked items just for you
            </p>
          </div>
          
          <div className="grid grid-3">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/women" className="btn btn-outline" style={{ marginRight: '15px' }}>
              View Women's Collection
            </Link>
            <Link to="/men" className="btn btn-outline" style={{ marginRight: '15px' }}>
              View Men's Collection
            </Link>
            <Link to="/kids" className="btn btn-outline">
              View Kids' Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="grid grid-2">
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
              color: 'white',
              padding: '40px'
            }}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>
                Summer Sale
              </h3>
              <p style={{ fontSize: '18px', marginBottom: '20px', opacity: '0.9' }}>
                Up to 70% off on summer collection
              </p>
              <Link to="/women" className="btn" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid white'
              }}>
                Shop Summer Collection
              </Link>
            </div>
            
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #48cae4 0%, #0077b6 100%)',
              color: 'white',
              padding: '40px'
            }}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>
                New Arrivals
              </h3>
              <p style={{ fontSize: '18px', marginBottom: '20px', opacity: '0.9' }}>
                Fresh styles every week
              </p>
              <Link to="/men" className="btn" style={{
                background: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                border: '2px solid white'
              }}>
                Explore New Arrivals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ 
        padding: '60px 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div className="container text-center">
          <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>
            Stay Updated
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '30px', opacity: '0.9' }}>
            Subscribe to our newsletter for exclusive offers and latest updates
          </p>
          <div style={{ 
            maxWidth: '400px', 
            margin: '0 auto',
            display: 'flex',
            gap: '10px'
          }}>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: '12px 15px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '14px'
              }}
            />
            <button className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '25px',
              padding: '12px 25px'
            }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;