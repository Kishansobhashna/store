import React, { useState } from 'react';
import './OrderForm.css';
import Footer from './Footer';
import Main from './Main';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    mobile: '',
    pincode: '',
    payment: '',
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const orderData = {
    ...formData,
    cart: cart,
  };

  try {
    const response = await axios.post(
      'http://localhost:5000/submit-order',
      orderData,
      { headers: { 'Content-Type': 'application/json' } }
    );

    if (response.status === 200) {
      alert('Order placed successfully! Confirmation email sent.');
      setFormData({
        name: '',
        email: '',
        address: '',
        mobile: '',
        pincode: '',
        payment: '',
        cardholderName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      });
    } else {
      alert('Order failed.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error submitting order.');
  }
};

  return (
    <div className="order-container">
      <Main />
      <h2>Order Details</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="input-field">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label>Phone:</label>
          <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} required />
        </div>
        <div className="input-field">
          <label>Payment Method:</label>
          <select name="payment" value={formData.payment} onChange={handleInputChange} required>
            <option value="">Select Payment Method</option>
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="cash_on_delivery">Cash on Delivery</option>
          </select>
        </div>

        {formData.payment === 'credit_card' && (
          <div className="credit-card-form">
            <h3>Credit Card Details</h3>
            <div className="input-field">
              <label>Cardholder Name:</label>
              <input type="text" name="cardholderName" value={formData.cardholderName} onChange={handleInputChange} required />
            </div>
            <div className="input-field">
              <label>Card Number:</label>
              <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required maxLength="16" />
            </div>
            <div className="input-field">
              <label>Expiry Date (MM/YY):</label>
              <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required placeholder="MM/YY" />
            </div>
            <div className="input-field">
              <label>CVV:</label>
              <input type="password" name="cvv" value={formData.cvv} onChange={handleInputChange} autoComplete="off" required maxLength="3" />
            </div>
          </div>
        )}

        <div className="button">
          <button type="submit" className="submit-btn">Submit Order</button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default OrderForm;