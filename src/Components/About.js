import React from 'react'
import Main from './Main';
import './About.css';
import Footer from './Footer';

const About = () => {
  return (
    <section id="about" className="about section">
      <Main/>
      <div className="container section-title" data-aos="fade-up">
        <h2 className="highlight">About Us</h2>
      </div>
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="style">
              In the year of liberation, 1947, a lone shoe store opened its doors to the public in Cloaca, Mumbai. Metro Shoes, the brand, is now a household name in India. Over the past seven decades, the company and the brand have become synonymous with unmatched quality, skilled craftsmanship and high-fashion products in the footwear industry.
            Metro Shoes has a countrywide network of retail stores at more than 200+ locations across 100+ cities in India designed to bring customers, an extensive collection of footwear and accessories to suit their every need. What began as a single outlet in Mumbai has today grown into a nationwide chain of exclusive fashion footwear and accessories stores for the entire family.
              </p>

              <p className="style">
              Step into style and comfort with Footwear etc., your ultimate shoe shopping destination! For 38 years, we've been a beloved community fixture, offering high-quality footwear that blends fashion and comfort. From trendy athletic shoes to supportive orthopedic options, we have something for everyone. Our user-friendly website makes finding your perfect pair simple and convenient.
               Browse top brands like Hoke, Brooks, New Balance, and more from home. Detailed descriptions, reviews, and sizing guides ensure informed choices.   

              </p>
              <div className="content ps-0">
                <ul>
                  <li>
                    <i className="bi bi-check-circle-fill"></i>
                    <span></span>
                  </li>
                </ul>
              </div>
              <div className="position-relative mt-4">
              <img src="images/a3.jpg" className="img-fluid rounded-4" alt="" style={{ width: '600px', height: '500px' }} />
              </div>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
            <img src="images/about1.jpg" className="img-fluid rounded-4 mb-4" alt="" style={{ width: '600px', height: '500px' }}  />
            
            <p className="style">Our knowledgeable staff is ready to assist via 
              email or phone, providing personalized recommendations. We prioritize your satisfaction for a seamless online shopping experience. 
              Visit our California locations or shop online for the perfect blend of style, comfort, and service. Whether you're a fashion-forward 
              shopper or seeking support and comfort, Footwear etc. has you covered. Your journey to fabulous footwear begins here!</p>
              
              
              <h5>A Step By Step Guide to Shoemaking </h5>
            <p className="style">Step 1: Measurements & Selection of Style</p>
            <p className="style">Step 2: Shoe Last Making</p>
            <p className="style">Step 3: Pattern Cutting & Clicking</p>
            <p className="style">Step 4: Assembling the Shoe</p>
            <p className="style">Step 5: The Trial Shoe </p>
            <p className="style">Step 6: Final Craftsmanship</p>
            <p className="style">Step 7: The Shoe Room</p>
            
            <div className="content ps-0">
              <ul>
                <li>
                  {/* <i className="bi bi-check-circle-fill"></i> */}
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
    </section>
  );
};

export default About;
