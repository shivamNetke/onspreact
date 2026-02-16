const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });

// Debug env load
console.log("Current working directory:", process.cwd());
console.log("RESEND_API_KEY from env:", process.env.RESEND_API_KEY ? "present (hidden)" : "MISSING");

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.status(200).json({ status: "Backend is running 🚀" });
});

/* -------------------- EMAIL TRANSPORTER (Resend) -------------------- */
const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
  // Timeout settings वाढवले – Render wake-up delay कव्हर करेल
  connectionTimeout: 120000,   // 120 सेकंद
  greetingTimeout: 60000,      // 60 सेकंद
  socketTimeout: 120000,       // 120 सेकंद
});

/* Verify function comment out केलं – production मध्ये unnecessary error दिसू नये */
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("Email config error:", error);
//   } else {
//     console.log("Email server is ready");
//   }
// });

/* -------------------- APPLY LOAN ROUTE -------------------- */
app.post("/apply-loan", async (req, res) => {
  try {
    const { loanoption, name, address, pincode, loanAmount, mobileno, loantenure, email } = req.body;

    if (!loanoption || !name || !email) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const loanData = { 
      loanoption, 
      name, 
      address, 
      pincode, 
      loanAmount, 
      mobileno, 
      loantenure, 
      email, 
      submittedAt: new Date().toISOString() 
    };

    const filePath = path.join(__dirname, "loanApplications.json");
    let existingData = [];

    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }

    existingData.push(loanData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    const adminMail = {
      from: "ONSP Loan <onboarding@resend.dev>",
      to: "netkeshiv3521@gmail.com",  // testing साठी तुझ्या email वर
      subject: "New Loan Application Received",
      text: `
Loan Option: ${loanoption}
Name: ${name}
Loan Amount: ₹${loanAmount}
Mobile: ${mobileno}
Email: ${email}
Submitted At: ${new Date().toISOString()}
      `,
    };

    const userMail = {
      from: "ONSP Loan <onboarding@resend.dev>",
      to: "netkeshiv3521@gmail.com",  // testing साठी तुझ्या email वर
      subject: "Loan Application Received – ONSP Bank",
      text: `Dear ${name},

Your loan application has been successfully received.

Loan Option: ${loanoption}
Loan Amount: ₹${loanAmount}
Tenure: ${loantenure} months

⚠️ This is a demo project.

Regards,
ONSP Bank`,
    };

    try {
      const adminInfo = await transporter.sendMail(adminMail);
      const userInfo = await transporter.sendMail(userMail);
      console.log("Emails sent successfully");
      console.log("Admin message ID:", adminInfo.messageId);
      console.log("User message ID:", userInfo.messageId);
    } catch (mailError) {
      console.error("Email send failed - full error:", mailError);
    }

    res.status(200).json({ success: true, message: "Loan application submitted successfully" });
  } catch (error) {
    console.error("Apply-loan error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});