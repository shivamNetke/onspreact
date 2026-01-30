import "../styles/locker.css";

function Locker() {
  return (
    <>
      {/* <header className="locker-header"> */}
        {/* <h3>Locker Services</h3> */}
        {/* <p>Safe • Secure • Reliable</p> */}
      {/* </header> */}

      <div className="locker-container">
        <section className="locker-intro">
          <h2>Our Locker Services</h2>
          <h4>Safe • Secure • Reliable</h4>
          <p>
            Secure your valuables with our modern locker facilities designed
            for maximum safety and privacy.
          </p>
        </section>

        <section className="locker-benefits">
          <h2>Benefits of Using Our Lockers</h2>
          <ul>
            <li>24/7 security surveillance</li>
            <li>Insurance coverage for your items</li>
            <li>Flexible rental terms</li>
            <li>Complete privacy and confidentiality</li>
          </ul>
        </section>
      </div>
    </>
  );
}

export default Locker;
