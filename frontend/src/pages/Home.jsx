import "../styles/home.css";
import Footer from "../components/Footer";
import { useState } from "react";

// Deployment साठी Render URL hardcode (env var नंतर remove करू शकतोस)
const API_URL = "https://onspreact.onrender.com";  // ← हे temporary hardcode – env var काम करत नसल्यामुळे

// Env var ची value काय आहे हे browser console मध्ये दाखव (debug साठी)
console.log("Home.jsx loaded - Using API_URL:", API_URL);

const Home = () => {
  const [formData, setFormData] = useState({
    loanoption: "",
    name: "",
    address: "",
    pincode: "",
    loanAmount: "",
    email: "",
    mobileno: "",
    loantenure: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullUrl = `${API_URL}/apply-loan`;
    console.log("Submitting form to:", fullUrl); // ← हे दिसेल कुठे request जातंय
    console.log("Form data:", formData);

    try {
      const res = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", res.status);
      console.log("Response ok:", res.ok);

      if (!res.ok) {
        let errorMessage = "Submission failed";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonErr) {
          console.error("JSON parse error:", jsonErr);
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();
      console.log("Success response from backend:", data);

      alert("Application submitted successfully ✅");

      // Form reset
      setFormData({
        loanoption: "",
        name: "",
        address: "",
        pincode: "",
        loanAmount: "",
        email: "",
        mobileno: "",
        loantenure: "",
      });
    } catch (err) {
      console.error("Full submit error:", err);
      alert(`Failed to submit application ❌\n${err.message}`);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Fill details to apply for a loan</h3>

          <div className="form-row">
            <select 
              name="loanoption" 
              value={formData.loanoption} 
              required 
              onChange={handleChange}
            >
              <option value="">SELECT LOAN</option>
              <option value="personal loan">Personal Loan</option>
              <option value="fdloan">FD Loan</option>
              <option value="goldloan">Gold Loan</option>
              <option value="vehicleloan">Vehicle Loan</option>
            </select>

            <input 
              name="name" 
              placeholder="Full name" 
              value={formData.name}
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <input 
              name="address" 
              placeholder="Address" 
              value={formData.address}
              required 
              onChange={handleChange} 
            />
            <input 
              name="pincode" 
              placeholder="Pincode" 
              maxLength="6" 
              value={formData.pincode}
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <input 
              type="text" 
              name="loanAmount" 
              placeholder="Loan Amount" 
              maxLength={7} 
              value={formData.loanAmount}
              required 
              onChange={(e) => { 
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                handleChange(e); 
              }} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <input 
              type="text" 
              name="mobileno" 
              placeholder="Mobile" 
              maxLength={10} 
              value={formData.mobileno}
              required 
              onChange={(e) => { 
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                handleChange(e); 
              }} 
            />
            <input 
              type="text" 
              name="loantenure" 
              placeholder="Tenure (months)" 
              maxLength={2} 
              value={formData.loantenure}
              required 
              onChange={(e) => { 
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                handleChange(e); 
              }} 
            />
          </div>

          <div className="form-actions">
            <button type="submit">Apply Now</button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Home;