import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Women.css'; 
import Main from './Main';
import Footer from './Footer';

function Women() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem('cart')) || [];
    });

    const [products, setProducts] = useState([
        { id: 1, name: 'Stylish white Shoes', price: 1499, image: 'images/w21.jpeg', quantity: 5 },
        { id: 2, name: 'High Heel Shoes', price: 2222, image: 'images/w5.jpeg', quantity: 3 },
        { id: 3, name: 'White & Pink Comfort Sneakers', price: 5555, image: 'images/w8.jpeg', quantity: 8 },
        { id: 4, name: 'Women Genuine Leather Shoes', price: 1111, image: 'images/w10.jpeg', quantity: 4 },
        { id: 5, name: 'Punjabi Mojdi', price: 1499, image: 'images/w13.jpeg', quantity: 2 },
        { id: 6, name: 'Ethnic Loafer for Women', price: 899, image: 'images/w16.jpeg', quantity: 0 },
        { id: 7, name: 'Autumn Stylish Shoes', price: 999, image: 'images/w18.jpeg', quantity: 6 },
        { id: 8, name: 'Breathable Sneakers', price: 1099, image: 'images/w20.jpeg', quantity: 1 },
        { id: 9, name: 'Cycling Shoes', price: 999, image: 'images/cycling.jpg', quantity: 5 },
    ]);

    const handleAddToCart = (id) => {
    const selectedProduct = products.find(product => product.id === id);

    if (!selectedProduct || selectedProduct.quantity === 0) {
      alert('Out of Stock');
      return;
    }

    const existingProductIndex = cart.findIndex(item => item.id === id);
    let updatedCart = [...cart];

    if(existingProductIndex !== -1)
    {
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        quantity: (updatedCart[existingProductIndex].quantity || 1) + 1,
      };
    }
    else
    {
      updatedCart.push({
        id: selectedProduct.id,
        name: selectedProduct.name,      
        price: selectedProduct.price,
        image: selectedProduct.image,
        quantity: 1,
      }); 
    }
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Decrease quantity
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, quantity: product.quantity - 1 } : product
    );
    setProducts(updatedProducts);
  };

    return (
        <div>
            <Main />
            <section className="product">
                <div className="container py-1">
                    <div className="row py-5">
                        {products.map((product) => (
                            <div key={product.id} className="col-lg-3 text-center">
                                <div className="card border-100 bg-light mb-2">
                                    <div className="card-body">
                                        <img src={product.image} className="img-fluid" alt={product.name} style={{ width: '500px', height: '260px' }} />
                                    </div>
                                </div>
                                <h6>{product.name}</h6>
                                <p>₹{product.price}</p>
                                <p>Available: {product.quantity}</p>
                                {product.quantity > 0 ? (
                                    <button
                                        className="food-btn"
                                        style={{ height: '50px', width: '130px' }}
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        Add To Cart
                                    </button>
                                ) : (
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}

export default Women;
