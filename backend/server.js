const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

console.log("Current working directory:", process.cwd());
console.log(
  "RESEND_API_KEYY from env:",
  process.env.RESEND_API_KEYY ? "present (hidden)" : "MISSING"
);

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEYY);

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

    if (!loanoption || !name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Required fields missing" });
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

    const filePath = path.join(__dirname, "loanApplications.json");
    let existingData = [];

    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
    }

    existingData.push(loanData);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    /* ----------- SEND EMAIL USING RESEND API ----------- */

    try {
      // Admin email
      await resend.emails.send({
        from: "ONSP Loan <onboarding@resend.dev>",
        to: "netkeshiv3521@gmail.com",
        subject: "New Loan Application Received",
        text: `
Loan Option: ${loanoption}
Name: ${name}
Loan Amount: ₹${loanAmount}
Mobile: ${mobileno}
Email: ${email}
Submitted At: ${new Date().toISOString()}
        `,
      });

      // User confirmation email
      await resend.emails.send({
        from: "ONSP Loan <onboarding@resend.dev>",
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
      });

      console.log("Emails sent successfully via Resend API");
    } catch (mailError) {
      console.error("Email send failed:", mailError);
    }

    res
      .status(200)
      .json({ success: true, message: "Loan application submitted successfully" });
  } catch (error) {
    console.error("Apply-loan error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
