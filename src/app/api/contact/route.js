import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    // Parse the request body to get form data
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);

    const { name, email, telegram, message } = bodyJSON;

    // Configure nodemailer with Zoho Mail SMTP based on official documentation
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu", // Use correct SMTP server based on region
      port: 587,             // Use 587 for TLS
      secure: false,          // Use STARTTLS
      auth: {
        user: process.env.ZOHO_EMAIL_USER, // Your Zoho email
        pass: process.env.ZOHO_EMAIL_PASS, // Your Zoho email password
      },
      tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
      },
    });

    // Set up email data for the recipient
    const mailOptionsRecipient = {
      from: `"Setorix" <info@setorix.com>` , // Sender address
      to: "info@setorix.com", // Change to your recipient's email
      subject: "New Contact Form Submission",
      text: `
        Name: ${name}
        Email: ${email}
        Telegram: ${telegram}
        Message: ${message}
      `,
    };

    // Send email to the recipient
    await transporter.sendMail(mailOptionsRecipient);

    return NextResponse.json({ message: "Success: emails were sent" });
  } catch (error) {
    console.error("Error sending emails:", error);
    return NextResponse.json({ message: "COULD NOT SEND MESSAGE" });
  }
}
