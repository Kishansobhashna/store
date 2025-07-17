import React, { useState } from "react";
import Main from "./Main";
import "./Contact.css";
import Footer from "./Footer";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 23.014284, // Latitude of the location
  lng: 72.525464, // Longitude of the location
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("Message Sent!");
      } else {
        setStatus("Error Sending Message. Try Again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error Sending Message. Try Again.");
    }
  };

  return (
    <div>
      <Main />
      <div className="contact-container">
        <div className="contact-form">
          <h1>Contact Us</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit">Send Message</button>
          </form>

          {status && <p>{status}</p>}
        </div>
      </div>

      <div className="map-container">
        <LoadScript googleMapsApiKey="">
          <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>

      <Footer />
    </div>
  );
};

export default ContactForm;
