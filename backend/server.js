require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ---------- Nodemailer setup ----------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email config at server start
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error:", error);
  } else {
    console.log("✅ Email server is ready");
  }
});

// ---------- Route ----------
app.post("/apply-loan", async (req, res) => {
  try {
    const {
      loanoption,
      name,
      address,
      pincode,
      loanAmount,
      mobileno,
      loantenure,
      email,
    } = req.body;

    // ---------- Save data locally ----------
    const loanData = {
      loanoption,
      name,
      address,
      pincode,
      loanAmount,
      mobileno,
      loantenure,
      email,
      submittedAt: new Date().toLocaleString("en-IN", { hour12: false }),
    };

    const filePath = path.join(__dirname, "loanApplications.json");

    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }

    existingData.push(loanData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    // ---------- Email content ----------
    const mailToAdmin = {
      from: process.env.EMAIL_USER,
      to: "netakeshivam@aca.edu.in",
      subject: "New Loan Application Received",
      text: `
Loan Option: ${loanoption}
Name: ${name}
Address: ${address}
Pincode: ${pincode}
Loan Amount: ₹${loanAmount}
Mobile: ${mobileno}
Tenure: ${loantenure} months
Email: ${email}
`,
    };

    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Loan Application Received – ONSP Bank",
      text: `Dear ${name},

Thank you for applying for a loan with ONSP Bank.

Loan Option: ${loanoption}
Loan Amount: ₹${loanAmount}
Tenure: ${loantenure} months

This is a demo application.

Regards,
ONSP Bank`,
    };

    // ---------- Send emails ----------
    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    // ---------- Response ----------
    res.status(200).json({ success: true, message: "Application submitted" });

  } catch (error) {
    console.error("❌ Apply-loan error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
