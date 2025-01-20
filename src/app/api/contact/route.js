import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request) {
  try {
    // Parse the request body to get form data
    const requestBody = await request.text();
    const bodyJSON = JSON.parse(requestBody);

    const {
      name,
      email,
      telegram,
      message,
    } = bodyJSON;


    // Configure nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail email
        pass: process.env.EMAIL_PASS, // Your Gmail password or app password
      },
      tls: {
        rejectUnauthorized: false, // This bypasses the certificate validation
      },
    });

    // Set up email data for the recipient
    const mailOptionsRecipient = {
      from: '"Setorix" <noreply@setorix.com>', // Sender address
      to: "noreply@setorix.com", // Change to your recipient's email
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
    return NextResponse.status(500).json({
      message: "COULD NOT SEND MESSAGE",
      error: error.message,
    });
  }
}
