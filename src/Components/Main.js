import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Main.css'; 
import { FaFacebook, FaInstagram, FaShoppingCart, FaYoutube, FaUser } from "react-icons/fa";

function Main() {
  const [cartCount, setCartCount] = useState(0);
  // const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const updateCartCount = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const totalItems = storedCart.reduce((acc, item) => acc + (item.quantity || 1), 0);
      setCartCount(totalItems);
    };

    // const storedUser = localStorage.getItem("user");
    // if (storedUser) {
    //   setUser(JSON.parse(storedUser)); // Convert string to object
    // }

    window.addEventListener("storage", updateCartCount);
    updateCartCount();

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

 const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  }

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="site-header text-black">
      <div className="header-top border-bottom py-2">
        <div className="container-lg">
          <div className="row justify-content-evenly">
            <div className="col">
              <ul className="social-links list-unstyled d-flex m-0">
                <li className="pe-2">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook style={{ width: "20px", height: "20px", color: "blue" }} />
                  </a>
                </li>
                <li className="pe-2">
                  <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram style={{ width: "20px", height: "20px", color: "pink" }} />
                  </a>
                </li>
                <li className="pe-2">
                  <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                    <FaYoutube style={{ width: "20px", height: "20px", color: "red" }} />
                  </a>
                </li>
              </ul>
            </div>
            <div className="col d-none d-md-block">
                <p className="text-center text-black m-0" style={{ textAlign : 'center', paddingRight : '300px'}}>
                  <strong>Special Offer</strong>: Order above ₹999 and enjoy free shipping
                </p>
            </div>
            {isLoggedIn ? (
              <button className="logout" style={{ height: '50px', width: '100px' }} onClick={handleLogout}>Logout</button>
            ) : (
              <button className="login" style={{ height: '50px', width: '100px' }} onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      </div>
  
      <nav className="navbar navbar-expand-lg">
        <div className="container-lg">
           <Link className="navbar-brand" to="/">
             <img src="images/main-logo.png" className="logo" alt="logo" />
           </Link>
           <div className="offcanvas-body">
             <ul className="navbar-nav fw-bold justify-content-end align-items-center flex-grow-1">
               <li className="nav-item"><Link className="nav-link me-5 active" to="/">Home</Link></li>
               <li className="nav-item"><Link className="nav-link me-5 active" to="/about">About us</Link></li>
               <li className="nav-item"><Link className="nav-link me-5 active" to="/men">Men</Link></li>
               <li className="nav-item"><Link className="nav-link me-5 active" to="/women">Women</Link></li>
               <li className="nav-item"><Link className="nav-link me-5 active" to="/contact">Contact</Link></li>
               <li className="nav-item">
                 <Link className="nav-link me-5 active" to="/cart">
                   <FaShoppingCart style={{ width: "30px", height: "20px", color: "black" }} />
                   {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
                 </Link>
               </li>
             </ul>
           </div>
        </div>
      </nav>
    </header>
  );
}

export default Main;