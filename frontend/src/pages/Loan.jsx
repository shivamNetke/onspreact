import "../styles/Loan.css";

function Loan() {
  return (
    <>
      <div className="loan-page">
        <header className="loan-header">
          <h1>Loan Services</h1>
          <p>Simple • Fast • Reliable</p>
        </header>

        <div className="loan-container">
          <div className="loan-card">
            <h3>Loan Features</h3>
            <ul>
              <li>Flexible repayment options</li>
              <li>No collateral required</li>
              <li>Quick approval process</li>
            </ul>
          </div>

          <div className="loan-card">
            <h3>Loans We Provide</h3>
            <ul>
              <li>FD Loan</li>
              <li>Personal Loan</li>
              <li>Vehicle Loan</li>
              <li>Gold Loan</li>
            </ul>
          </div>

          <div className="loan-card">
            <h3>Documents Required</h3>
            <ul>
              <li>Aadhar Card (Xerox)</li>
              <li>PAN Card (Xerox)</li>
              <li>2 Blank Signed Cheques</li>
              <li>2 Passport Size Photos</li>
              <li>Vehicle Documents - optional</li>
              <li>Gold Documents - optional</li>
              <li>FD Documents - optional</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loan;
