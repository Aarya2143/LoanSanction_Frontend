import React from "react";
import { Link } from "react-router-dom";
import "./../styles/style.css";

function Home() {
  return (
    <div className="home-container">
      <h3>Welcome to the Loan Sanction Application</h3>
      <p>Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.</p>
    </div>
  );
}

export default Home;
