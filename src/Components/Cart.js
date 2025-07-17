import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import Main from './Main';
import Footer from './Footer';

function Cart() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    const handleCheckout = () => {
        const isLoggedIn = localStorage.getItem('token'); // or 'user' if you store user data
    
        if (isLoggedIn) {
            navigate('/orderer');
        } else {
            navigate('/login');
        }
    };
    
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    
        const totalItems = storedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        localStorage.setItem('cartCount', totalItems);
        window.dispatchEvent(new Event('storage'));
       
    }, []);
    
    const updateCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    
        const totalItems = updatedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        localStorage.setItem('cartCount', totalItems);
        
        window.dispatchEvent(new Event('storage'));
    };
    
        const handleAddToCart = (item) => {
        let updatedCart = [...cart];
        const existingItem = updatedCart.find(cartItem => cartItem.id === item.id);
    
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
        } else {
            updatedCart.push({ ...item, quantity: 1 });
        }
    
        updateCart(updatedCart);
    };
    
    const handleIncrement = (id) => {
        const updatedCart = cart.map(item => 
            item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        updateCart(updatedCart);
    };

    const handleDecrement = (id) => {
        const updatedCart = cart.map(item => 
            item.id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
        );
        updateCart(updatedCart);
    };

    const totalPrice = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    const handleRemoveFromCart = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        updateCart(updatedCart);
    };

    return (
        <div className="container py-5">
            <Main cartCount={cart.reduce((acc, item) => acc + (item.quantity || 1), 0)} />
            <h2>Cart Page</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="row">
                    {cart.map((item, index) => (
                        <div key={index} className="col-lg-3 text-center">
                            <div className="card border-100 bg-light mb-2">
                                <div className="card-body">
                                    <img src={item.image} className="img-fluid" alt={item.name} style={{ width: '500px', height: '260px' }} />
                                </div>
                            </div>
                            <h6>{item.name}</h6>
                            <p>₹{item.price}</p>
                            <div className="quantity-controls">
                                <button className="decrement-btn" style={{ height: '40px', width: '30px' }} onClick={() => handleDecrement(item.id)}>-</button>
                                <span className="quantity">{item.quantity || 1}</span>
                                <button className="increment-btn" style={{ height: '40px', width: '30px' }} onClick={() => handleIncrement(item.id)}>+</button>
                            </div>                            
                            <button className="remove-btn" style={{ height: '40px', width: '80px' }} onClick={() => handleRemoveFromCart(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div className="cart-summary">
                <h5>Subtotal: ₹{totalPrice.toFixed(2)}</h5>
                <h6>Sales Tax(18%): ₹{(totalPrice * 0.18).toFixed(2)}</h6>
                <h4>Grand Total: ₹{(totalPrice * 1.18).toFixed(2)}</h4>
            </div>   

            <div className="k">
                    <button style={{ height: '50px', width: '170px' }} onClick={() => navigate('/men')}>Continue Shopping</button>
                    {cart.length > 0 && (
                    <button style={{ height: '50px', width: '100px' }} onClick={handleCheckout} type="submit">Checkout</button>
                    )}
            </div>

           <Footer />
        </div>
    );
}

export default Cart;