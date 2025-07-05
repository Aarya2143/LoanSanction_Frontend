import React, { useState } from "react";
import axios from "axios";
import "./../styles/style.css";

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

    const requested = Number(form.requestedAmount);
    const monthlyIncome = Number(form.monthlyIncome);
    const creditScore = Number(form.creditScore);

    if (requested < 50000 || requested > 4000000) {
      setMessage("❌ Loan amount must be between ₹50,000 and ₹40,00,000.");
      return;
    }

    const maxEligibleAmount =
      form.stableJob && creditScore >= 750
        ? monthlyIncome * 20
        : monthlyIncome * 10;

    if (requested <= maxEligibleAmount) {
      const loanRequestDTO = {
        applicantName: form.applicantName,
        age: Number(form.age),
        jobType: form.jobType,
        stableJob: form.stableJob,
        monthlyIncome: monthlyIncome,
        annualItr: form.annualItr ? Number(form.annualItr) : 0,
        creditScore: creditScore,
        requestedAmount: requested,
        tenureMonths: Number(form.tenureMonths)
      };

      setLoading(true);
      try {
        const res = await axios.post("http://localhost:8080/api/loans/apply", loanRequestDTO);
        console.log("Loan save response", res.data);

        if (res.data && res.data.id) {
          setMessage(`✅ Loan sanctioned! Amount: ₹${requested}, Tenure: ${form.tenureMonths} months. Loan ID: ${res.data.id}`);
        } else if (res.data && res.data.message) {
          // Backend sent a message like EMI exceeds 50% — just show it
          setMessage(`❌ ${res.data.message}`);
        } else {
          setMessage(`❌ Unexpected response: ${JSON.stringify(res.data)}`);
        }

      } catch (err) {
        console.error("Error saving loan", err);
        setMessage(`❌ ${err.response?.data || err.message}`);
      } finally {
        setLoading(false);
      }

    } else {
      setMessage(`❌ Not eligible for ₹${requested}. Max eligible: ₹${maxEligibleAmount}.`);
    }
  };

  return (
    <div>
      <h4>Check Max Eligibility</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label><strong>Applicant Name</strong></label>
          <input
            type="text"
            className="form-control"
            name="applicantName"
            value={form.applicantName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label><strong>Age</strong></label>
          <input
            type="number"
            className="form-control"
            name="age"
            value={form.age}
            onChange={handleChange}
            min="18"
            max="70"
            required
          />
        </div>

        <div className="mb-2">
          <label><strong>Job Type</strong></label>
          <select
            className="form-control"
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Businessman">Businessman</option>
            <option value="Housewife">Housewife</option>
            <option value="Salaried">Salaried</option>
          </select>
        </div>

        <div className="stable-job-inline">
          <input
            type="checkbox"
            name="stableJob"
            checked={form.stableJob}
            onChange={handleChange}
          />
          <label className="ms-1"><strong>Stable Job</strong></label>
        </div>

        <div className="mb-2">
          <label><strong>Monthly Income</strong></label>
          <input
            type="number"
            className="form-control"
            name="monthlyIncome"
            value={form.monthlyIncome}
            onChange={handleChange}
            min="1000"
            required
          />
        </div>

        <div className="mb-2">
          <label><strong>Annual ITR</strong></label>
          <input
            type="number"
            className="form-control"
            name="annualItr"
            value={form.annualItr}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="mb-2">
          <label><strong>Credit Score</strong></label>
          <input
            type="number"
            className="form-control"
            name="creditScore"
            value={form.creditScore}
            onChange={handleChange}
            min="300"
            max="900"
            required
          />
        </div>

        <div className="mb-2">
          <label><strong>Requested Loan Amount</strong></label>
          <input
            type="number"
            className="form-control"
            name="requestedAmount"
            value={form.requestedAmount}
            onChange={handleChange}
            min="50000"
            max="4000000"
            required
          />
        </div>

        <div className="mb-2">
          <label><strong>Tenure (months)</strong></label>
          <select
            className="form-control"
            name="tenureMonths"
            value={form.tenureMonths}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {[3, 6, 12, 18, 24, 36, 48, 60].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Processing..." : "Check Eligibility"}
        </button>
      </form>
    </div>
  );
}

export default MaxEligibility;
