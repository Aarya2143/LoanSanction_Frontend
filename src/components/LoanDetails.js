
import React, { useEffect, useState } from "react";
import axios from "axios";

function LoanDetails({ loanId }) {
  const [loanDetails, setLoanDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLoanDetails = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view loan details.");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/api/loans/${loanId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLoanDetails(res.data);
        setError("");
      } catch (err) {
        setError(err.response?.data || "Failed to fetch loan details");
      }
    };

    fetchLoanDetails();
  }, [loanId]);

  return (
    <div className="container mt-4">
      <h4>Loan Details</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {loanDetails ? (
        <div className="card p-3">
          <p><strong>ID:</strong> {loanDetails.id}</p>
          <p><strong>Sanctioned Amount:</strong> ₹{loanDetails.sanctionedAmount}</p>
          <p><strong>Sanctioned Tenure:</strong> {loanDetails.sanctionedTenure} months</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
}

export default LoanDetails;
