import React, {  } from "react";
import SliderComponent from "./SliderComponent";
import './Home.css';
import { Link  } from 'react-router-dom';



const Home = () => {
  
    
  const products = [
    { id: 1,  image: "/images/card-item1.jpg" },
    { id: 2,  image: "/images/card-item2.jpg" },
    { id: 3,  image: "/images/card-item3.jpg" },
    { id: 4,  image: "/images/card-item4.jpg" },
    { id: 5,  image: "/images/card-item5.jpg" },
    { id: 6,  image: "/images/card-item6.jpg" },
    { id: 7,  image: "/images/card-item7.jpg" },
    { id: 8,  image: "/images/card-item8.jpg" },
    { id: 9,  image: "/images/card-item9.jpg" },
    { id: 10, image: "/images/card-item10.jpg" },
    { id: 11, image: "/images/m15.jpeg"},
    { id: 12, image: "/images/w21.jpeg" },
  ];

  return (
    <div>
      
      <h1>Welcome to Our Stylish Online Store</h1>
      <SliderComponent />

      <section id="featured-products" className="product-store">
        <div className="container-md">
          <div className="display-header d-flex align-items-center justify-content-between">
            <h2 className="section-title text-uppercase">Featured Products</h2>
            <div className="btn-right">
              <Link to="/men" className="d-inline-block text-uppercase text-hover fw-bold">
                View all
              </Link>
            </div>
          </div>

          <div className="product-content padding-small">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
              {products.map((product) => (
                <div key={product.id} className="col mb-4">
                  <div className="product-card position-relative">
                    <div className="card-img">
                      <img src={product.image} alt={product.name} className="product-image img-fluid" />
                    </div>
                    <div className="card-detail d-flex justify-content-between align-items-center mt-3">
                      <h3 className="card-title fs-6 fw-normal m-0">{product.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
