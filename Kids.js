import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { products } from '../data/products';

const Kids = () => {
  const [filteredProducts, setFilteredProducts] = useState(products.kids);
  const [filters, setFilters] = useState({
    size: [],
    brand: [],
    price: [],
    color: [],
    discount: []
  });
  const [sortBy, setSortBy] = useState('featured');

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'clear') {
      setFilters({
        size: [],
        brand: [],
        price: [],
        color: [],
        discount: []
      });
      setFilteredProducts(products.kids);
      return;
    }

    const newFilters = { ...filters };
    
    if (newFilters[filterType].includes(value)) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    } else {
      newFilters[filterType] = [...newFilters[filterType], value];
    }
    
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let filtered = [...products.kids];

    // Apply brand filter
    if (currentFilters.brand.length > 0) {
      filtered = filtered.filter(product => 
        currentFilters.brand.includes(product.brand)
      );
    }

    // Apply size filter
    if (currentFilters.size.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes.some(size => currentFilters.size.includes(size))
      );
    }

    // Apply color filter
    if (currentFilters.color.length > 0) {
      filtered = filtered.filter(product => 
        product.colors.some(color => currentFilters.color.includes(color))
      );
    }

    // Apply price filter
    if (currentFilters.price.length > 0) {
      filtered = filtered.filter(product => {
        return currentFilters.price.some(priceRange => {
          switch (priceRange) {
            case 'Under ₹500':
              return product.price < 500;
            case '₹500-₹1000':
              return product.price >= 500 && product.price <= 1000;
            case '₹1000-₹2000':
              return product.price >= 1000 && product.price <= 2000;
            case '₹2000-₹5000':
              return product.price >= 2000 && product.price <= 5000;
            case 'Above ₹5000':
              return product.price > 5000;
            default:
              return true;
          }
        });
      });
    }

    // Apply discount filter
    if (currentFilters.discount.length > 0) {
      filtered = filtered.filter(product => {
        if (!product.originalPrice) return false;
        const discountPercent = ((product.originalPrice - product.price) / product.originalPrice) * 100;
        return currentFilters.discount.some(discountRange => {
          const minDiscount = parseInt(discountRange.split('%')[0]);
          return discountPercent >= minDiscount;
        });
      });
    }

    setFilteredProducts(filtered);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);
    
    let sorted = [...filteredProducts];
    
    switch (sortValue) {
      case 'price-low-high':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.sort((a, b) => b.id - a.id);
        break;
      case 'discount':
        sorted.sort((a, b) => {
          const discountA = a.originalPrice ? ((a.originalPrice - a.price) / a.originalPrice) * 100 : 0;
          const discountB = b.originalPrice ? ((b.originalPrice - b.price) / b.originalPrice) * 100 : 0;
          return discountB - discountA;
        });
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  };

  const subcategories = [
    { name: 'Boys Clothing', link: '#', icon: 'fas fa-male' },
    { name: 'Girls Clothing', link: '#', icon: 'fas fa-female' },
    { name: 'Baby Essentials', link: '#', icon: 'fas fa-baby' },
    { name: 'Party Wear', link: '#', icon: 'fas fa-star' },
    { name: 'Casual Wear', link: '#', icon: 'fas fa-tshirt' },
    { name: 'School Wear', link: '#', icon: 'fas fa-graduation-cap' }
  ];

  return (
    <div style={{ padding: '20px 0' }}>
      <div className="container">
        {/* Header Section */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>
            Kids' Fashion
          </h1>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Comfortable and stylish clothing for your little ones
          </p>
        </div>

        {/* Subcategories */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          overflowX: 'auto', 
          paddingBottom: '10px',
          marginBottom: '30px'
        }}>
          {subcategories.map((subcat, index) => (
            <div 
              key={index}
              style={{
                minWidth: '120px',
                padding: '15px',
                background: 'white',
                borderRadius: '8px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.background = '#667eea';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.background = 'white';
                e.target.style.color = 'inherit';
              }}
            >
              <i className={subcat.icon} style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}></i>
              <span style={{ fontSize: '12px', fontWeight: '500' }}>{subcat.name}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px' }}>
          {/* Filters Sidebar */}
          <div>
            <Filters 
              filters={filters} 
              onFilterChange={handleFilterChange}
              category="kids"
            />
          </div>

          {/* Products Section */}
          <div>
            {/* Sort and Results Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '20px',
              padding: '15px 20px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div>
                <span style={{ fontWeight: '500', color: '#333' }}>
                  {filteredProducts.length} Products Found
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '14px', color: '#666' }}>Sort by:</label>
                <select 
                  value={sortBy}
                  onChange={handleSortChange}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest First</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-3">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <i className="fas fa-search" style={{ fontSize: '48px', color: '#ccc', marginBottom: '20px' }}></i>
                <h3 style={{ fontSize: '20px', color: '#666', marginBottom: '10px' }}>
                  No products found
                </h3>
                <p style={{ color: '#999' }}>
                  Try adjusting your filters or search criteria
                </p>
                <button 
                  onClick={() => handleFilterChange('clear', null)}
                  className="btn btn-primary"
                  style={{ marginTop: '20px' }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kids;