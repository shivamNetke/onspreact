
// import "../styles/home.css";
// import Footer from "../components/Footer";
// import { useState } from "react";

// const Home = () => {
//   const [formData, setFormData] = useState({
//     loanoption: "",
//     name: "",
//     address: "",
//     pincode: "",
//     loanAmount: "",
//     email: "",
//     mobileno: "",
//     loantenure: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // const res = await fetch("http://localhost:5000/apply-loan", {
//       const res = await fetch("https://onspreact.onrender.com/apply-loan", {

//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) throw new Error("Submission failed");

//       alert("Application submitted successfully ✅");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to submit application ❌");
//     }
//   };

//   return (
//     <>
//       <div className="form-wrapper">
//         <form className="form" onSubmit={handleSubmit}>
//           <h3>Fill details to apply for a loan</h3>

//           <div className="form-row">
//             <select name="loanoption" required onChange={handleChange}>
//               <option value="">SELECT LOAN</option>
//               <option value="personal loan">Personal Loan</option>
//               <option value="fdloan">FD Loan</option>
//               <option value="goldloan">Gold Loan</option>
//               <option value="vehicleloan">Vehicle Loan</option>
//             </select>

//             <input name="name" placeholder="Full name" required onChange={handleChange} />
//           </div>

//           <div className="form-row">
//             <input name="address" placeholder="Address" required onChange={handleChange} />
//             <input name="pincode" placeholder="Pincode" maxLength="6" required onChange={handleChange} />
//           </div>

//           <div className="form-row">
//             <input type="text" name="loanAmount" placeholder="Loan Amount" maxLength={7} required onChange={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ""); handleChange(e); }}/>
//             <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
//           </div>

//           <div className="form-row">
//             <input type="text" name="mobileno" placeholder="Mobile" maxLength={10} required onChange={(e) => {e.target.value = e.target.value.replace(/[^0-9]/g, "");handleChange}} />
//             <input type="text" name="loantenure" placeholder="Tenure" maxLength={2} required onChange={(e) => {e.target.value = e.target.value.replace(/[^0-9]/g, "");handleChange}} />
//           </div>

// <div className="form-actions">
//             <button type="submit">Apply</button>
//           </div>
//           {/* <button type="submit">Apply</button> */}
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Home;
// import "../styles/home.css";
// import Footer from "../components/Footer";
// import { useState } from "react";

// // Production साठी Render URL (Netlify वरून submit केल्यावर हे use होईल)
// // Local साठी comment/uncomment करून test करू शकतोस
// const API_URL = import.meta.env.VITE_API_URL 
//   ? import.meta.env.VITE_API_URL 
//   : "http://localhost:5000";  // local default

// const Home = () => {
//   const [formData, setFormData] = useState({
//     loanoption: "",
//     name: "",
//     address: "",
//     pincode: "",
//     loanAmount: "",
//     email: "",
//     mobileno: "",
//     loantenure: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${API_URL}/apply-loan`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.message || "Submission failed");
//       }

//       alert("Application submitted successfully ✅");

//       // Form reset कर
//       setFormData({
//         loanoption: "",
//         name: "",
//         address: "",
//         pincode: "",
//         loanAmount: "",
//         email: "",
//         mobileno: "",
//         loantenure: "",
//       });

//     } catch (err) {
//       console.error("Submit error:", err);
//       alert(`Failed to submit application ❌\n${err.message}`);
//     }
//   };

//   return (
//     <>
//       <div className="form-wrapper">
//         <form className="form" onSubmit={handleSubmit}>
//           <h3>Fill details to apply for a loan</h3>

//           <div className="form-row">
//             <select name="loanoption" value={formData.loanoption} required onChange={handleChange}>
//               <option value="">SELECT LOAN</option>
//               <option value="personal loan">Personal Loan</option>
//               <option value="fdloan">FD Loan</option>
//               <option value="goldloan">Gold Loan</option>
//               <option value="vehicleloan">Vehicle Loan</option>
//             </select>

//             <input 
//               name="name" 
//               placeholder="Full name" 
//               value={formData.name}
//               required 
//               onChange={handleChange} 
//             />
//           </div>

//           <div className="form-row">
//             <input 
//               name="address" 
//               placeholder="Address" 
//               value={formData.address}
//               required 
//               onChange={handleChange} 
//             />
//             <input 
//               name="pincode" 
//               placeholder="Pincode" 
//               maxLength="6" 
//               value={formData.pincode}
//               required 
//               onChange={handleChange} 
//             />
//           </div>

//           <div className="form-row">
//             <input 
//               type="text" 
//               name="loanAmount" 
//               placeholder="Loan Amount" 
//               maxLength={7} 
//               value={formData.loanAmount}
//               required 
//               onChange={(e) => { 
//                 e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
//                 handleChange(e); 
//               }} 
//             />
//             <input 
//               type="email" 
//               name="email" 
//               placeholder="Email" 
//               value={formData.email}
//               required 
//               onChange={handleChange} 
//             />
//           </div>

//           <div className="form-row">
//             <input 
//               type="text" 
//               name="mobileno" 
//               placeholder="Mobile" 
//               maxLength={10} 
//               value={formData.mobileno}
//               required 
//               onChange={(e) => { 
//                 e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
//                 handleChange(e);  // ← हे fix केलं
//               }} 
//             />
//             <input 
//               type="text" 
//               name="loantenure" 
//               placeholder="Tenure (months)" 
//               maxLength={2} 
//               value={formData.loantenure}
//               required 
//               onChange={(e) => { 
//                 e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
//                 handleChange(e);  // ← हे fix केलं
//               }} 
//             />
//           </div>

//           <div className="form-actions">
//             <button type="submit">Apply Now</button>
//           </div>
//         </form>
//       </div>

//       <Footer />
//     </>
//   );
// };

// export default Home;

import "../styles/home.css";
import Footer from "../components/Footer";
import { useState } from "react";

// API URL हे environment variable ने handle करतो
// Netlify वर deploy केल्यावर .env किंवा Netlify dashboard मध्ये VITE_API_URL set कर
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Home = () => {
  const [formData, setFormData] = useState({
    loanoption: "",
    name: "",
    address: "",
    pincode: "",
    loanAmount: "",
    email: "",
    mobileno: "",
    loantenure: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/apply-loan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Submission failed");
      }

      alert("Application submitted successfully ✅");

      // Form reset कर (user experience साठी चांगलं)
      setFormData({
        loanoption: "",
        name: "",
        address: "",
        pincode: "",
        loanAmount: "",
        email: "",
        mobileno: "",
        loantenure: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      alert(`Failed to submit application ❌\n${err.message}`);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Fill details to apply for a loan</h3>

          <div className="form-row">
            <select 
              name="loanoption" 
              value={formData.loanoption} 
              required 
              onChange={handleChange}
            >
              <option value="">SELECT LOAN</option>
              <option value="personal loan">Personal Loan</option>
              <option value="fdloan">FD Loan</option>
              <option value="goldloan">Gold Loan</option>
              <option value="vehicleloan">Vehicle Loan</option>
            </select>

            <input 
              name="name" 
              placeholder="Full name" 
              value={formData.name}
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <input 
              name="address" 
              placeholder="Address" 
              value={formData.address}
              required 
              onChange={handleChange} 
            />
            <input 
              name="pincode" 
              placeholder="Pincode" 
              maxLength="6" 
              value={formData.pincode}
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <input 
              type="text" 
              name="loanAmount" 
              placeholder="Loan Amount" 
              maxLength={7} 
              value={formData.loanAmount}
              required 
              onChange={(e) => { 
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                handleChange(e); 
              }} 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              required 
              onChange={handleChange} 
            />
          </div>

          <div className="form-row">
            <input 
              type="text" 
              name="mobileno" 
              placeholder="Mobile" 
              maxLength={10} 
              value={formData.mobileno}
              required 
              onChange={(e) => { 
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                handleChange(e); 
              }} 
            />
            <input 
              type="text" 
              name="loantenure" 
              placeholder="Tenure (months)" 
              maxLength={2} 
              value={formData.loantenure}
              required 
              onChange={(e) => { 
                e.target.value = e.target.value.replace(/[^0-9]/g, ""); 
                handleChange(e); 
              }} 
            />
          </div>

          <div className="form-actions">
            <button type="submit">Apply Now</button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Home;