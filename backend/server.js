const path = require("path");
require("dotenv").config({ path: path.join(__dirname, '.env') });

console.log("Current working directory:", process.cwd());
console.log("RESEND_API_KEY from env:", process.env.RESEND_API_KEY ? "present (hidden)" : "MISSING");

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ status: "Backend is running 🚀" });
});

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 587,
  secure: false,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email config error:", error);
  } else {
    console.log("Email server is ready");
  }
});

app.post("/apply-loan", async (req, res) => {
  try {
    const { loanoption, name, address, pincode, loanAmount, mobileno, loantenure, email } = req.body;

    if (!loanoption || !name || !email) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    const loanData = { loanoption, name, address, pincode, loanAmount, mobileno, loantenure, email, submittedAt: new Date().toISOString() };

    const filePath = path.join(__dirname, "loanApplications.json");
    let existingData = [];

    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }

    existingData.push(loanData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    const adminMail = {
      from: "ONSP Loan <onboarding@resend.dev>",
      to: "netkeshiv3521@gmail.com",
      subject: "New Loan Application Received",
      text: `Loan Option: ${loanoption}\nName: ${name}\nLoan Amount: ₹${loanAmount}\nMobile: ${mobileno}\nEmail: ${email}`,
    };

    const userMail = {
      from: "ONSP Loan <onboarding@resend.dev>",
      to: "netkeshiv3521@gmail.com",
      subject: "Loan Application Received – ONSP Bank",
      text: `Dear ${name},\n\nYour loan application has been successfully received.\n\nLoan Option: ${loanoption}\nLoan Amount: ₹${loanAmount}\nTenure: ${loantenure} months\n\nRegards,\nONSP Bank`,
    };

    try {
      await transporter.sendMail(adminMail);
      await transporter.sendMail(userMail);
      console.log("Emails sent successfully");
    } catch (mailError) {
      console.error("Email send failed:", mailError.message);
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