import "../styles/termdepositdetails.css";
import Footer from "../components/Footer";

function TermDeposit() {
  return (
    <>
    <div className="termdeposit-page">
      <div className="container">
        <h2 className="page-title">Term Deposit</h2>

        <p className="page-desc">
          Term deposits offer a fixed interest rate for a specific period,
          ensuring your investment grows safely with guaranteed returns.
        </p>

        <div className="advantage">
          <h3 className="section-title">Benefits of Term Deposits</h3>

          <ul className="benefit-list">
            <li>Guaranteed returns on investment</li>
            <li>No risk to your principal amount</li>
            <li>Flexible tenure options</li>
            <li>Improves long-term financial planning</li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default TermDeposit;
