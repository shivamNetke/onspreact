// const path = require("path");
// require("dotenv").config({ path: path.join(__dirname, '.env') });

// // Debug env load
// console.log("Current working directory:", process.cwd());
// console.log("RESEND_API_KEY from env:", process.env.RESEND_API_KEY ? "present (hidden)" : "MISSING");

// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const fs = require("fs");

// const app = express();
// const PORT = process.env.PORT || 5000;

// /* -------------------- MIDDLEWARE -------------------- */
// app.use(cors({ origin: "*" }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* -------------------- HEALTH CHECK -------------------- */
// app.get("/", (req, res) => {
//   res.status(200).json({ status: "Backend is running 🚀" });
// });

// /* -------------------- EMAIL TRANSPORTER (Resend) -------------------- */
// const transporter = nodemailer.createTransport({
//   host: "smtp.resend.com",
//   port: 587,
//   secure: false, // TLS
//   auth: {
//     user: "resend",                    // हे fixed राहील
//     pass: process.env.RESEND_API_KEY,  // ← तुझा Resend API key
//   },
// });

// /* Verify transporter on startup */
// transporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ Email config error (full):", error);
//   } else {
//     console.log("✅ Email server is ready to send mails (Resend)");
//   }
// });

// /* -------------------- APPLY LOAN ROUTE -------------------- */
// app.post("/apply-loan", async (req, res) => {
//   try {
//     const {
//       loanoption,
//       name,
//       address,
//       pincode,
//       loanAmount,
//       mobileno,
//       loantenure,
//       email,
//     } = req.body;

//     /* BASIC VALIDATION */
//     if (!loanoption || !name || !email) {
//       return res.status(400).json({
//         success: false,
//         message: "Required fields missing",
//       });
//     }

//     /* SAVE TO JSON FILE */
//     const loanData = {
//       loanoption,
//       name,
//       address,
//       pincode,
//       loanAmount,
//       mobileno,
//       loantenure,
//       email,
//       submittedAt: new Date().toISOString(),
//     };

//     const filePath = path.join(__dirname, "loanApplications.json");
//     let existingData = [];

//     if (fs.existsSync(filePath)) {
//       existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
//     }

//     existingData.push(loanData);
//     fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

//     /* EMAILS */
//     const adminMail = {
//       from: "ONSP Loan <onboarding@resend.dev>",  // Resend साठी from हे असावं (verified domain नसेल तर)
//       // to: "netakeshivam@aca.edu.in",              // तुझा receiving email
//       to: "netkeshiv3521@gmail.com",
//       subject: "New Loan Application Received",
//       text: `
// Loan Option: ${loanoption}
// Name: ${name}
// Loan Amount: ₹${loanAmount}
// Mobile: ${mobileno}
// Email: ${email}
//       `,
//     };

//     const userMail = {
//       from: "ONSP Loan <onboarding@resend.dev>",
//       to: email,
//       subject: "Loan Application Received – ONSP Bank",
//       text: `Dear ${name},

// Your loan application has been successfully received.

// Loan Option: ${loanoption}
// Loan Amount: ₹${loanAmount}
// Tenure: ${loantenure} months

// ⚠️ This is a demo project.

// Regards,
// ONSP Bank`,
//     };

//     /* Send emails with detailed logging */
//     try {
//       const adminInfo = await transporter.sendMail(adminMail);
//       const userInfo = await transporter.sendMail(userMail);
//       console.log("Emails sent successfully");
//       console.log("Admin email message ID:", adminInfo.messageId);
//       console.log("User email message ID:", userInfo.messageId);
//     } catch (mailError) {
//       console.error("❌ Email send failed - full error:", mailError);
//     }

//     /* RESPONSE */
//     res.status(200).json({
//       success: true,
//       message: "Loan application submitted successfully",
//     });

//   } catch (error) {
//     console.error("❌ Apply-loan error:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// });

// /* -------------------- START SERVER -------------------- */
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
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
  secure: false, // TLS
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

/* Verify transporter on startup */
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error (full):", error);
  } else {
    console.log("✅ Email server is ready to send mails (Resend)");
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

    /* EMAILS - Testing mode fix: To address तुझ्या Resend account च्या email वर fixed */
    const adminMail = {
      from: "ONSP Loan <onboarding@resend.dev>",
      to: "netkeshiv3521@gmail.com",  // ← Resend testing rule: फक्त हे email allowed
      subject: "New Loan Application Received (Test)",
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
      to: "netkeshiv3521@gmail.com",  // ← test साठी तुझ्या email वर (user चा email नंतर domain verify केल्यावर change करू)
      subject: "Loan Application Received – ONSP Bank (Test)",
      text: `Dear ${name},

Your loan application has been successfully received.

Loan Option: ${loanoption}
Loan Amount: ₹${loanAmount}
Tenure: ${loantenure} months

⚠️ This is a demo project - email sent to test account.

Regards,
ONSP Bank`,
    };

    /* Send emails with detailed logging */
    try {
      const adminInfo = await transporter.sendMail(adminMail);
      const userInfo = await transporter.sendMail(userMail);
      console.log("Emails sent successfully");
      console.log("Admin email message ID:", adminInfo.messageId);
      console.log("User email message ID:", userInfo.messageId);
    } catch (mailError) {
      console.error("❌ Email send failed - full error:", mailError);
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