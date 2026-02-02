import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import Recurring from './../pages/Recurring';
import TermDeposit from './../pages/TermDepositDetails';


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="company-name">O N S P</Link>

        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <span className="nav-link">About</span>
            <div className="dropdown-menu">
              <Link to="/ourvalues" className="dropdown-option">Our Values</Link>
              <Link to="/ourventures" className="dropdown-option">Our Ventures</Link>
              <Link to="/ourteam" className="dropdown-option">Our Team</Link>
              <Link to="/ourvision" className="dropdown-option">Our Vision</Link>
            </div>
          </li>

          <li className="nav-item dropdown">
            <span className="nav-link">Services</span>
            <div className="dropdown-menu">
              <Link to="/locker" className="dropdown-option">Locker</Link>
              <Link to="/loan" className="dropdown-option">Loan</Link>
              <Link to="/recurring" className="dropdown-option">Recurring</Link>
              <Link to="/termdepositedetails" className="dropdown-option">Term Deposit</Link>

            </div>
          </li>

          <li className="nav-item">
            <Link to="/loancalculator" className="nav-link">LoanCalculator</Link>
          </li>

          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
