import "../styles/recurring.css";
import Footer from "../components/Footer";
function Recurring() {
  return (
    <>
    <div className="recurring-page">
      <div className="container">
        <h2 className="page-title">Recurring Deposit</h2>

        <p className="page-desc">
          A recurring deposit is a type of term deposit that allows you to
          deposit a fixed amount regularly and build savings with guaranteed
          returns.
        </p>

        <h3 className="section-title">Key Benefits</h3>

        <ul className="importance-list">
          <li>Helps in regular saving</li>
          <li>Offers fixed interest rates</li>
          <li>Instills discipline in saving habits</li>
        </ul>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Recurring;
