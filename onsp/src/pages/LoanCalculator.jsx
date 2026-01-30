import  { useState } from "react";
import "../styles/loancalculator.css";
import Footer from "../components/Footer";
import Loan from "../pages/Loan";


const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [result, setResult] = useState("");

  const interestRate = 0.03; // 3% fixed interest

  const calculateLoan = () => {
    if (loanAmount && loanTenure) {
      const principal = parseFloat(loanAmount);
      const tenure = parseFloat(loanTenure);

      const interest = principal * interestRate * (tenure / 12);
      const totalPayable = principal + interest;
      const monthlyPayable = totalPayable / tenure;

      setResult(
        `Interest: ₹${interest.toFixed(2)}\n` +
        `Monthly Payable Amount: ₹${monthlyPayable.toFixed(2)}\n` +
        `Total Payable Amount: ₹${totalPayable.toFixed(2)}`
      );
    } else {
      setResult("Please enter both loan amount and tenure.");
    }
  };

  return (
    <section>
      <div className="maindiv">
        
      
      <div className="loan-calculator">
        
          
        
        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="tel"
          id="loanAmount"
          placeholder="Enter loan amount"
          maxLength="7"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <br /><br />

        <label htmlFor="loanInterest">Loan Interest (%):</label>
        <input
          type="tel"
          id="loanInterest"
          value="3"
          readOnly
        />
        <br /><br />

        <label htmlFor="loanTenure">Loan Tenure (Months):</label>
        <input
          type="tel"
          id="loanTenure"
          placeholder="Enter loan tenure in months"
          maxLength="2"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
        />
        <br /><br />

        <button id="btn" onClick={calculateLoan}>Calculate</button>

        {result && (
          <p style={{ whiteSpace: "pre-line", marginTop: "10px" }}>{result}</p>
        )}

      
      </div>
      </div>
      <Footer />
    </section>
  );
};

export default LoanCalculator;