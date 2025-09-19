import React from 'react';

const Filters = ({ filters, onFilterChange, category }) => {
  const handleFilterChange = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  const getFilterOptions = (filterType) => {
    switch (filterType) {
      case 'size':
        return category === 'kids' 
          ? ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y', '14-15Y']
          : ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];
      case 'brand':
        return ['Zara', 'H&M', 'Nike', 'Adidas', 'Levi\'s', 'Calvin Klein', 'Tommy Hilfiger', 'Puma'];
      case 'price':
        return ['Under ₹500', '₹500-₹1000', '₹1000-₹2000', '₹2000-₹5000', 'Above ₹5000'];
      case 'color':
        return ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Gray', 'Brown'];
      case 'discount':
        return ['10% and above', '20% and above', '30% and above', '40% and above', '50% and above'];
      default:
        return [];
    }
  };

  const renderFilterSection = (filterType, title) => (
    <div className="filter-section">
      <div className="filter-title">{title}</div>
      <div className="filter-options">
        {getFilterOptions(filterType).map((option) => (
          <button
            key={option}
            className={`filter-option ${filters[filterType]?.includes(option) ? 'active' : ''}`}
            onClick={() => handleFilterChange(filterType, option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="filters">
      <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600' }}>Filters</h3>
      
      {renderFilterSection('size', 'Size')}
      {renderFilterSection('brand', 'Brand')}
      {renderFilterSection('price', 'Price Range')}
      {renderFilterSection('color', 'Color')}
      {renderFilterSection('discount', 'Discount')}
      
      <div className="filter-section">
        <button 
          className="btn btn-outline"
          onClick={() => onFilterChange('clear', null)}
          style={{ width: '100%' }}
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;