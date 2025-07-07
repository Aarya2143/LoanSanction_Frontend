import React from "react";
import { Link } from "react-router-dom";
import "../styles/style.css";

function HomePage() {
  return (
    <>
      <h1>Welcome to the Loan Sanction Application</h1>
      <p>
        Please <Link to="/login">Login</Link> or <Link to="/register">Register</Link> to continue.
      </p>
    </>
  );
}

export default HomePage;