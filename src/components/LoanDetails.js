import React, { useState } from "react";
import axios from "axios";

function LoanDetails() {
  const [id, setId] = useState("");
  const [loan, setLoan] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:8080/api/loans/details/${id}`)
      .then(res => {
        setLoan(res.data);
        setMessage(""); // ✅ Clear error message on success
      })
      .catch(err => {
        setLoan(null);
        setMessage(err.response?.data || "Error occurred");
      });
  };

  return (
    <div>
      <h4>Get Loan Details</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Loan ID</label>
          <input
            type="number"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-info">Fetch Details</button>
      </form>

      {/* Error message */}
      {message && <div className="alert alert-danger mt-2">{message}</div>}

      {/* Loan details */}
      {loan && (
        <div className="mt-3">
          <h5>Loan Info</h5>
          <ul className="list-group">
            {Object.entries(loan).map(([key, value]) => (
              <li key={key} className="list-group-item">
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default LoanDetails;
