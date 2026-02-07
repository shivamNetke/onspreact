
const path = require("path");  // हे पहिलं import करावं लागतं

// dotenv ला path ची गरज आहे, म्हणून path आधी import केलं
require("dotenv").config({ 
  path: path.join(__dirname, '.env') 
});

// Debug logs - env load झाली का हे ताबडतोब दिसेल
console.log("Current working directory:", process.cwd());
console.log("EMAIL_USER from env:", process.env.EMAIL_USER);
console.log("EMAIL_PASS from env:", process.env.EMAIL_PASS ? "present (hidden)" : "MISSING");

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

/* -------------------- EMAIL TRANSPORTER -------------------- */

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  // port: 587,
  port: 465,
  // secure: false, // TLS required for port 587
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // tls: {
  //   rejectUnauthorized: false,
  // },
});

/* Verify transporter on startup (very useful for debugging) */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error (full):", error);
  } else {
    console.log("✅ Email server is ready to send mails");
  }
});

/* -------------------- APPLY LOAN ROUTE -------------------- */

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

    /* BASIC VALIDATION */
    if (!loanoption || !name || !email) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing",
      });
    }

    /* SAVE TO JSON FILE */
    const loanData = {
      loanoption,
      name,
      address,
      pincode,
      loanAmount,
      mobileno,
      loantenure,
      email,
      submittedAt: new Date().toISOString(),
    };

    const filePath = path.join(__dirname, "loanApplications.json");
    let existingData = [];

    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }

    existingData.push(loanData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    /* EMAILS */
    const adminMail = {
      from: process.env.EMAIL_USER,
      to: 'netakeshivam@aca.edu.in',
      subject: "New Loan Application Received",
      text: `
Loan Option: ${loanoption}
Name: ${name}
Loan Amount: ₹${loanAmount}
Mobile: ${mobileno}
Email: ${email}
      `,
    };

    const userMail = {
      from: process.env.EMAIL_USER,
      to: email,
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

    /* Send emails (fail-safe) */
    try {
      await transporter.sendMail(adminMail);
      await transporter.sendMail(userMail);
      console.log("Emails sent successfully");
    } catch (mailError) {
      console.error("❌ Email send failed:", mailError.message);
      console.error("Full mail error:", mailError);
    }

    /* RESPONSE */
    res.status(200).json({
      success: true,
      message: "Loan application submitted successfully",
    });

  } catch (error) {
    console.error("❌ Apply-loan error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

/* -------------------- START SERVER -------------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});