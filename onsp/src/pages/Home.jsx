import "../styles/home.css";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
<div className="floating-menu">
  <div className="floating-track">
    <a className="floating-btn">Recurring</a>
    <a className="floating-btn">RTGS</a>
    <a className="floating-btn">Term Deposit</a>
    <a className="floating-btn">Locker</a>
    <a className="floating-btn">Loan</a>

    {/* duplicate for smooth loop */}
    <a className="floating-btn">Recurring</a>
    <a className="floating-btn">RTGS</a>
    <a className="floating-btn">Term Deposit</a>
    <a className="floating-btn">Locker</a>
    <a className="floating-btn">Loan</a>

    {/* duplicate for smooth loop */}
    <a className="floating-btn">Recurring</a>
    <a className="floating-btn">RTGS</a>
    <a className="floating-btn">Term Deposit</a>
    <a className="floating-btn">Locker</a>
    <a className="floating-btn">Loan</a>

  </div>
</div>

    {/* i want here all component view like a button floating right to left {component = recurring, rtgs, termdeposit, locker, loan, ourventure, ourvision, ourvalues,} */}
      <div className="form-wrapper">
        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <h3>Fill details to apply for a loan</h3>

          <div className="form-row">
            <select name="loanoption" required>
              <option value="" disabled defaultValue>
                SELECT LOAN
              </option>
              <option value="personal loan">Personal Loan</option>
              <option value="fdloan">FD Loan</option>
              <option value="goldloan">Gold Loan</option>
              <option value="vehicleloan">Vehicle Loan</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              required
            />
            <input
              type="tel"
              name="pincode"
              placeholder="Enter your pincode"
              minLength="6"
              maxLength="6"
              required
            />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="loanAmount"
              placeholder="Enter loan amount"
              required
            />
            <input type="email" name="email" placeholder="Enter Email" required />
          </div>

          <div className="form-row">
            <input
              type="tel"
              name="mobileno"
              placeholder="Enter mobile number"
              minLength="10"
              maxLength="10"
              required
            />
            <input
              type="tel"
              name="loantenure"
              placeholder="Enter loan tenure (months)"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit">Apply</button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Home;
