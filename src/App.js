import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import MaxEligibility from "./components/MaxEligibility";
import LoanDetails from "./components/LoanDetails";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Loan Sanction System</h2>
        <nav className="mb-3">
          <Link className="btn btn-success me-2" to="/eligibility">Check Max Eligibility</Link>
          <Link className="btn btn-info me-2" to="/details">Get Loan Details</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/eligibility" element={<MaxEligibility />} />
          <Route path="/details" element={<LoanDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
