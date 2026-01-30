import Footer from "../components/Footer";
import "../styles/ourteam.css";

function OurTeam() {
  return (
    <>
    <div className="team-page">
      <div className="team-header">
        <h2>Our Team Members</h2>
        <p>Our team is dedicated to providing the best banking experience.</p>
      </div>

      <div className="team-grid">
        <div className="team-card">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQFHEf4BQ69DvA/profile-displayphoto-shrink_200_200/B56ZZd_F_uHAAc-/0/1745333543644?e=2147483647&v=beta&t=E83zAmgx-RrgnZPDogl9bfE8mdI46A0MeAVn1k8Y8aE" alt="Member 1" />
          <h3>Member 1</h3>
          <span>Manager</span>
          <p>10 years of experience in banking and finance.</p>
        </div>

        <div className="team-card">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQFHEf4BQ69DvA/profile-displayphoto-shrink_200_200/B56ZZd_F_uHAAc-/0/1745333543644?e=2147483647&v=beta&t=E83zAmgx-RrgnZPDogl9bfE8mdI46A0MeAVn1k8Y8aE" alt="Member 2" />
          <h3>Member 2</h3>
          <span>Executive</span>
          <p>5 years of experience in customer service.</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default OurTeam;
