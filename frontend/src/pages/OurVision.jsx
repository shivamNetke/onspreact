import Footer from "../components/Footer";
import "../styles/ourvision.css";

function OurVision() {
  return (
    <>
      <div className="vision-page">
        <div className="vision-card">
          <h2>Our Vision</h2>
          <p>
            To be the most trusted bank, providing exceptional services and
            empowering communities through financial inclusion.
          </p>
        </div>

        <div className="vision-grid">
          <div className="vision-box">
            <h3>Our Goals</h3>
            <p>
              To create long-term value for customers through innovation,
              transparency, and reliable financial solutions.
            </p>
          </div>

          <div className="vision-box">
            <h3>Future Aspirations</h3>
            <p>
              We aim to expand globally while adopting advanced technologies to
              deliver seamless and secure banking experiences.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OurVision;
