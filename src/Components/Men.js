import React, { useState,useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Men.css'; 
import Main from './Main';  
import Footer from './Footer';
import { ProductContext } from './ProductContext';

function Men() {
  const navigate = useNavigate();
  // const { product, updateProductQuantity } = useContext(ProductContext);
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  const [products, setProducts] = useState([
    { id: 1, name: 'Sneakers', price: 999, image: 'images/card-large-item7.jpg', quantity: 3 },
    { id: 2, name: 'Campus Shoes', price: 1499, image: 'images/collection-item2.jpg', quantity: 5 },
    { id: 3, name: 'Sports Running Shoes', price: 399, image: 'images/m3.jpeg', quantity: 10 },
    { id: 4, name: 'ARBS Men Shoes', price: 951, image: 'images/m4.jpeg', quantity: 2 },
    { id: 5, name: 'Men Lace-up Formal Shoes', price: 1999, image: 'images/m7.jpeg', quantity: 1 },
    { id: 6, name: 'Design Zip Closure Shoes', price: 899, image: 'images/m9.jpeg', quantity: 0 },
    { id: 7, name: 'Business Dress Shoes', price: 2899, image: 'images/m11.jpeg', quantity: 4 },
    { id: 8, name: 'Bacca Bucci Shoes', price: 1499, image: 'images/m20.jpeg', quantity: 2 },
    { id: 9, name: 'Cycling Shoes', price: 999, image: 'images/cycling.jpg', quantity: 3 },
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
                  <img 
                    src={product.image} 
                    className="img-fluid" 
                    alt={product.name} 
                    style={{ width: '500px', height: '260px' }} 
                  />
                </div>
              </div>
              <h6>{product.name}</h6>
              <p>₹{product.price}</p>
              <p>Stock Left: {product.quantity}</p>
              {product.quantity === 0 ? (
                <p style={{ color: 'red', fontWeight: 'bold' }}>Out of Stock</p>
              ) : (
                <button 
                  className="food-btn"  
                  style={{ height: '50px', width: '130px' }}
                  onClick={() => handleAddToCart(product.id)}
                >
                Add To Cart
                </button>
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

export default Men;