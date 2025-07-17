import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(stored);
  }, []);

  const updateProductQuantity = (id, delta) => {
    const updated = products.map(p =>
      p.id === id ? { ...p, quantity: p.quantity + delta } : p
    );
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, updateProductQuantity }}>
      {children}
    </ProductContext.Provider>
  );
};
