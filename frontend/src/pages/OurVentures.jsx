import "../styles/ourventures.css";
import Footer from "../components/Footer";

function OurVentures() {
  return (
    <>
    <div className="ventures-page">
      <div className="ventures-header">
        <h2>Explore Our Ventures</h2>
        <p>Discover the various business ventures we are involved in.</p>
      </div>

      <div className="venture-list">
        <div className="venture-card">
          <h3>Venture 1</h3>
          <p>
            Description of Venture 1. We focus on providing reliable and
            innovative financial solutions.
          </p>
        </div>

        <div className="venture-card">
          <h3>Venture 2</h3>
          <p>
            Description of Venture 2. Our services are designed to support
            growth and long-term success.
          </p>
        </div>
      </div>
    </div>
      <Footer/>
    </>
  );
}

export default OurVentures;
