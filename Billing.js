import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Billing = () => {
  const { cartItems, getCartTotal, getCartItemsCount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!billingData.firstName) newErrors.firstName = 'First name is required';
    if (!billingData.lastName) newErrors.lastName = 'Last name is required';
    if (!billingData.email) newErrors.email = 'Email is required';
    if (!billingData.phone) newErrors.phone = 'Phone number is required';
    if (!billingData.address) newErrors.address = 'Address is required';
    if (!billingData.city) newErrors.city = 'City is required';
    if (!billingData.state) newErrors.state = 'State is required';
    if (!billingData.pincode) newErrors.pincode = 'Pincode is required';

    if (billingData.paymentMethod === 'card') {
      if (!cardData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!cardData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!cardData.cvv) newErrors.cvv = 'CVV is required';
      if (!cardData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      alert('Order placed successfully! 🎉\n\nThank you for your purchase. You will receive a confirmation email shortly.');
      clearCart();
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };

  const subtotal = getCartTotal();
  const tax = Math.round(subtotal * 0.18);
  const shipping = subtotal > 999 ? 0 : 99;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', color: '#333' }}>
          Checkout
        </h1>

        <div className="billing-container">
          {/* Billing Form */}
          <div className="billing-form">
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
                Billing Information
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
                <div className="form-group">
                  <label className="form-label">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    value={billingData.firstName}
                    onChange={handleBillingChange}
                    style={{ borderColor: errors.firstName ? '#dc3545' : '' }}
                  />
                  {errors.firstName && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    value={billingData.lastName}
                    onChange={handleBillingChange}
                    style={{ borderColor: errors.lastName ? '#dc3545' : '' }}
                  />
                  {errors.lastName && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={billingData.email}
                  onChange={handleBillingChange}
                  style={{ borderColor: errors.email ? '#dc3545' : '' }}
                />
                {errors.email && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={billingData.phone}
                  onChange={handleBillingChange}
                  style={{ borderColor: errors.phone ? '#dc3545' : '' }}
                />
                {errors.phone && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Address *</label>
                <textarea
                  name="address"
                  className="form-input"
                  rows="3"
                  value={billingData.address}
                  onChange={handleBillingChange}
                  style={{ borderColor: errors.address ? '#dc3545' : '', resize: 'vertical' }}
                />
                {errors.address && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.address}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '15px', marginBottom: '30px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={billingData.city}
                    onChange={handleBillingChange}
                    style={{ borderColor: errors.city ? '#dc3545' : '' }}
                  />
                  {errors.city && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.city}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <select
                    name="state"
                    className="form-input"
                    value={billingData.state}
                    onChange={handleBillingChange}
                    style={{ borderColor: errors.state ? '#dc3545' : '' }}
                  >
                    <option value="">Select State</option>
                    <option value="AP">Andhra Pradesh</option>
                    <option value="AR">Arunachal Pradesh</option>
                    <option value="AS">Assam</option>
                    <option value="BR">Bihar</option>
                    <option value="CT">Chhattisgarh</option>
                    <option value="GA">Goa</option>
                    <option value="GJ">Gujarat</option>
                    <option value="HR">Haryana</option>
                    <option value="HP">Himachal Pradesh</option>
                    <option value="JK">Jammu and Kashmir</option>
                    <option value="JH">Jharkhand</option>
                    <option value="KA">Karnataka</option>
                    <option value="KL">Kerala</option>
                    <option value="MP">Madhya Pradesh</option>
                    <option value="MH">Maharashtra</option>
                    <option value="MN">Manipur</option>
                    <option value="ML">Meghalaya</option>
                    <option value="MZ">Mizoram</option>
                    <option value="NL">Nagaland</option>
                    <option value="OR">Odisha</option>
                    <option value="PB">Punjab</option>
                    <option value="RJ">Rajasthan</option>
                    <option value="SK">Sikkim</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="TG">Telangana</option>
                    <option value="TR">Tripura</option>
                    <option value="UP">Uttar Pradesh</option>
                    <option value="UT">Uttarakhand</option>
                    <option value="WB">West Bengal</option>
                    <option value="DL">Delhi</option>
                  </select>
                  {errors.state && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.state}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    className="form-input"
                    value={billingData.pincode}
                    onChange={handleBillingChange}
                    style={{ borderColor: errors.pincode ? '#dc3545' : '' }}
                  />
                  {errors.pincode && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.pincode}</span>}
                </div>
              </div>

              {/* Payment Method */}
              <h2 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>
                Payment Method
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={billingData.paymentMethod === 'card'}
                    onChange={handleBillingChange}
                    style={{ marginRight: '10px' }}
                  />
                  <i className="fas fa-credit-card" style={{ marginRight: '8px' }}></i>
                  Credit/Debit Card
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={billingData.paymentMethod === 'upi'}
                    onChange={handleBillingChange}
                    style={{ marginRight: '10px' }}
                  />
                  <i className="fas fa-mobile-alt" style={{ marginRight: '8px' }}></i>
                  UPI Payment
                </label>
                
                <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={billingData.paymentMethod === 'cod'}
                    onChange={handleBillingChange}
                    style={{ marginRight: '10px' }}
                  />
                  <i className="fas fa-money-bill-wave" style={{ marginRight: '8px' }}></i>
                  Cash on Delivery
                </label>
              </div>

              {/* Card Details */}
              {billingData.paymentMethod === 'card' && (
                <div style={{ padding: '20px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#333' }}>Card Details</h3>
                  
                  <div className="form-group">
                    <label className="form-label">Name on Card *</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      className="form-input"
                      value={cardData.nameOnCard}
                      onChange={handleCardChange}
                      style={{ borderColor: errors.nameOnCard ? '#dc3545' : '' }}
                    />
                    {errors.nameOnCard && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.nameOnCard}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      className="form-input"
                      placeholder="1234 5678 9012 3456"
                      value={cardData.cardNumber}
                      onChange={handleCardChange}
                      style={{ borderColor: errors.cardNumber ? '#dc3545' : '' }}
                    />
                    {errors.cardNumber && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.cardNumber}</span>}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div className="form-group">
                      <label className="form-label">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        className="form-input"
                        placeholder="MM/YY"
                        value={cardData.expiryDate}
                        onChange={handleCardChange}
                        style={{ borderColor: errors.expiryDate ? '#dc3545' : '' }}
                      />
                      {errors.expiryDate && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.expiryDate}</span>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        className="form-input"
                        placeholder="123"
                        value={cardData.cvv}
                        onChange={handleCardChange}
                        style={{ borderColor: errors.cvv ? '#dc3545' : '' }}
                      />
                      {errors.cvv && <span style={{ color: '#dc3545', fontSize: '12px' }}>{errors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  padding: '15px',
                  fontSize: '16px',
                  opacity: isProcessing ? 0.7 : 1 
                }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <i className="fas fa-spinner fa-spin" style={{ marginRight: '10px' }}></i>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock" style={{ marginRight: '10px' }}></i>
                    Place Order - ₹{total.toLocaleString()}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
              Order Summary
            </h3>

            {/* Items */}
            <div style={{ marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: '#f8f9fa',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <i className="fas fa-image" style={{ color: '#ccc' }}></i>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: '#666' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="summary-item">
              <span>Subtotal ({getCartItemsCount()} items)</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            
            <div className="summary-item">
              <span>Shipping</span>
              <span style={{ color: shipping === 0 ? '#27ae60' : '#333' }}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            
            <div className="summary-item">
              <span>Tax (GST 18%)</span>
              <span>₹{tax.toLocaleString()}</span>
            </div>
            
            <div className="summary-total">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            {/* Security Info */}
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              background: '#f8f9fa', 
              borderRadius: '8px',
              fontSize: '12px',
              color: '#666'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <i className="fas fa-shield-alt" style={{ color: '#27ae60' }}></i>
                <span>Your payment information is secure and encrypted</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fas fa-truck" style={{ color: '#667eea' }}></i>
                <span>Estimated delivery: 3-5 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;