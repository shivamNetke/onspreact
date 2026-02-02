require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

/* -------------------- MIDDLEWARE -------------------- */

// ✅ DEPLOYMENT SAFE CORS
app.use(cors({
  origin: "*", // later you can restrict to Netlify URL
}));

app.use(express.json()); // ✅ better than bodyParser alone
app.use(bodyParser.urlencoded({ extended: true }));

/* -------------------- EMAIL SETUP -------------------- */

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* ✅ DO NOT CRASH SERVER IF EMAIL FAILS */
transporter.verify((error) => {
  if (error) {
    console.error("❌ Email config error:", error.message);
  } else {
    console.log("✅ Email server is ready");
  }
});

/* -------------------- HEALTH CHECK (IMPORTANT) -------------------- */
// ✅ REQUIRED FOR RENDER (prevents cold-start confusion)
app.get("/", (req, res) => {
  res.status(200).json({ status: "Backend is running 🚀" });
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

    // ✅ BASIC VALIDATION (DEPLOYMENT SAFE)
    if (!email || !name || !loanoption) {
      return res.status(400).json({ success: false, message: "Missing fields" });
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
      submittedAt: new Date().toISOString(),
    };

    /* -------------------- FILE STORAGE -------------------- */

    const filePath = path.join(__dirname, "loanApplications.json");

    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }

    existingData.push(loanData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    /* -------------------- EMAILS -------------------- */

    const mailToAdmin = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // ✅ safer than hardcoding
      subject: "New Loan Application Received",
      text: `
Loan Option: ${loanoption}
Name: ${name}
Loan Amount: ₹${loanAmount}
Mobile: ${mobileno}
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

⚠️ This is a demo project.

Regards,
ONSP Bank`,
    };

    await transporter.sendMail(mailToAdmin);
    await transporter.sendMail(mailToUser);

    /* -------------------- RESPONSE -------------------- */

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
    });

  } catch (error) {
    console.error("❌ Apply-loan error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

/* -------------------- START SERVER -------------------- */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
