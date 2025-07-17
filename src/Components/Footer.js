import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <div>
      <footer id="footer" className="py-5 border-top">
    <div className="container-lg">
      <div className="row">
        <div className="col-lg-2 pb-3">
          <div className="footer-menu">
            <h5 className="widget-title pb-2">Info</h5>
            <ul className="menu-list list-unstyled">
              <li className="pb-2">
                <a href="/">Track Your Order</a>
              </li>
              <li className="pb-2">
                <a href="/">Our Blog</a>
              </li>
              <li className="pb-2">
                <a href="/">Privacy policy</a>
              </li>
              <li className="pb-2">
                <a href="/">Shipping</a>
              </li>
              <li className="pb-2">
                <a href="/">Contact Us</a>
              </li>
              <li className="pb-2">
                <a href="/">Help</a>
              </li>
              <li className="pb-2">
                <a href="/">Community</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 pb-3">
          <div className="footer-menu">
            <h5 className="widget-title pb-2">About</h5>
            <ul className="menu-list list-unstyled">
              <li className="pb-2">
                <a href="/">History</a>
              </li>
              <li className="pb-2">
                <a href="/">Our Team</a>
              </li>
              <li className="pb-2">
                <a href="/">Services</a>
              </li>
              <li className="pb-2">
                <a href="/">Company</a>
              </li>
              <li className="pb-2">
                <a href="/">Manufacture</a>
              </li>
              <li className="pb-2">
                <a href="/">Wholesale</a>
              </li>
              <li className="pb-2">
                <a href="/">Retail</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="col-lg-2 pb-3">
          <div className="footer-menu">
            <h5 className="widget-title pb-2">Popular</h5>
            <ul className="menu-list list-unstyled">
              <li className="pb-2">
                <a href="/">Prices Drop</a>
              </li>
              <li className="pb-2">
                <a href="/">New Products</a>
              </li>
              <li className="pb-2">
                <a href="/">Best Sales</a>
              </li>
              <li className="pb-2">
                <a href="/">Stores</a>
              </li>
              <li className="pb-2">
                <Link to="/login" data-bs-toggle="modal" data-bs-target="/modallogin">Login</Link>
              </li>
              <li className="pb-2">
                <Link to="/signup" data-bs-toggle="modal" data-bs-target="/modallogin">SignUp</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 pb-3">
          <div className="footer-menu">
            <h5 className="widget-title pb-2">Mens Collection</h5>
            <ul className="menu-list list-unstyled">
              <li className="pb-2">
                <a href="/">Delivery</a>
              </li>
              <li className="pb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="pb-2">
                <a href="/">Shoes</a>
              </li>
              <li className="pb-2">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-2 pb-3">
          <div className="footer-menu">
            <h5 className="widget-title pb-3">Get In Touch</h5>
            <div className="footer-contact-text">
              <span>Sun Gravitas,<br/> Near shaymal Road Ahmadabad.</span><br/>
              <span> Call us: +91 99899 88988 </span>
              <span className="text-hover fw-bold light-border"><a href="https://mail.google.com/mail/u/0/#inbox?compose=new">contact@stylishonlinestore.com</a></span>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <p>© Copyright Stylish 2025.  </p>
        </div>
        
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer;
