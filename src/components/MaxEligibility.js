import React, { useState } from "react";
import axios from "axios";

function MaxEligibility() {
  const [form, setForm] = useState({
    applicantName: "",
    age: "",
    jobType: "",
    stableJob: false,
    monthlyIncome: "",
    annualItr: "",
    creditScore: "",
    requestedAmount: "",
    tenureMonths: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to apply for a loan");
      return;
    }

    const requested = Number(form.requestedAmount);
    const monthlyIncome = Number(form.monthlyIncome);
    const creditScore = Number(form.creditScore);
    const age = Number(form.age);
    const tenure = Number(form.tenureMonths);

    if (requested < 50000 || requested > 4000000) {
      setMessage("❌ Loan amount must be between ₹50,000 and ₹40,00,000.");
      return;
    }
    if ((age + tenure / 12) > 50) {
      setMessage("❌ Loan tenure exceeds age 50 limit.");
      return;
    }

    const maxEligibleAmount =
      form.stableJob && creditScore >= 750
        ? monthlyIncome * 20
        : monthlyIncome * 10;

    if (requested > maxEligibleAmount) {
      setMessage(`❌ Not eligible for ₹${requested}. Max eligible: ₹${maxEligibleAmount}.`);
      return;
    }

    const interestRate = 0.01;
    const emi = (requested * interestRate * Math.pow(1 + interestRate, tenure)) /
      (Math.pow(1 + interestRate, tenure) - 1);

    if (emi > monthlyIncome * 0.5) {
      setMessage("❌ EMI exceeds 50% of monthly income.");
      return;
    }

    const loanRequestDTO = {
      ...form,
      age,
      monthlyIncome,
      creditScore,
      requestedAmount: requested,
      tenureMonths: tenure
    };

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8080/api/loans/apply", loanRequestDTO, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data;
      if (data?.id) {
        setMessage(`✅ Loan sanctioned! Amount: ₹${data.sanctionedAmount}, Tenure: ${data.sanctionedTenure} months`);
      } else if (data?.message?.toLowerCase().includes("sanctioned")) {
        setMessage(
          `✅ Loan sanctioned! Amount: ₹${data.sanctionedAmount || requested}, Tenure: ${data.sanctionedTenure || tenure} months`
        );
      } else {
        setMessage(`❌ ${data?.message || "Loan rejected"}`);
      }
    } catch (err) {
      setMessage(`❌ ${err.response?.data || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>Check Max Eligibility</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="applicantName"
          placeholder="Name"
          value={form.applicantName}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="age"
          placeholder="Age"
          value={form.age}
          onChange={handleChange}
          required
        />
        <select
          className="form-control mb-2"
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
          required
        >
          <option value="">Select Job Type</option>
          <option>Businessman</option>
          <option>Housewife</option>
          <option>Salaried</option>
        </select>
        <div className="form-check mb-2">
          <input
            className="form-check-input"
            type="checkbox"
            name="stableJob"
            checked={form.stableJob}
            onChange={handleChange}
          />
          <label>Stable Job</label>
        </div>
        <input
          className="form-control mb-2"
          type="number"
          name="monthlyIncome"
          placeholder="Monthly Income"
          value={form.monthlyIncome}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="annualItr"
          placeholder="Annual ITR"
          value={form.annualItr}
          onChange={handleChange}
        />
        <input
          className="form-control mb-2"
          type="number"
          name="creditScore"
          placeholder="Credit Score"
          value={form.creditScore}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="requestedAmount"
          placeholder="Requested Amount"
          value={form.requestedAmount}
          onChange={handleChange}
          required
        />
        <select
          className="form-control mb-2"
          name="tenureMonths"
          value={form.tenureMonths}
          onChange={handleChange}
          required
        >
          <option value="">Select Tenure (months)</option>
          {[3, 6, 12, 24, 36, 48, 60].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default MaxEligibility;
