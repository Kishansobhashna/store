import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Main from "./Main";
import Footer from "./Footer";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div>
      <Main />
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {user.name || "User"} 👋</h2>
      <img
        src={user.picture || "https://via.placeholder.com/100"}
        alt="Profile"
        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
      />
      <p><strong>Email:</strong> {user.email}</p>
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>Logout</button>
    </div>
    <Footer />
    </div>
  );
}

export default Profile;
