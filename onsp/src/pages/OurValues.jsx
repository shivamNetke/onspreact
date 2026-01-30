import Footer from "../components/Footer";
import "../styles/ourvalues.css";

function OurValues() {
  return (
    <div>
      
    
    <div className="core-values">
  <h2>Our Core Values</h2>
  <p>
    At our company, we are guided by values that define who we are and how we
    serve our customers. These principles drive our decisions, culture, and
    commitment to excellence.
  </p>

  <div className="values-list">
    <div className="value-item">
      <h3>Integrity</h3>
      <p>
        We act honestly and ethically in all situations. Our word is our bond,
        and we always strive to do what is right, even when no one is watching.
      </p>
    </div>

    <div className="value-item">
      <h3>Respect</h3>
      <p>
        We value diversity and treat everyone with dignity. Every voice matters,
        and we foster an environment where people feel heard and appreciated.
      </p>
    </div>

    <div className="value-item">
      <h3>Customer Focus</h3>
      <p>
        Our customers are at the heart of everything we do. We listen to their
        needs, anticipate challenges, and deliver solutions that exceed
        expectations.
      </p>
    </div>

    <div className="value-item">
      <h3>Innovation</h3>
      <p>
        We embrace change and encourage creativity. By exploring new ideas and
        approaches, we continuously improve and stay ahead in our industry.
      </p>
    </div>
  </div>
</div>
<Footer />
</div>
  );
}

export default OurValues;
