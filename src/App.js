import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import MaxEligibility from "./components/MaxEligibility";
import LoanDetails from "./components/LoanDetails";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light mb-3">
        <div className="container">
          <Link className="navbar-brand" to="/">Loan App</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/eligibility" element={<MaxEligibility />} />
          <Route path="/details" element={<LoanDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
