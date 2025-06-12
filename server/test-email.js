// this is a test script to send an email using nodemailer. You can run this file with node to test your SMTP configuration.
require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendTestEmail() {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: false, // true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        let info = await transporter.sendMail({
            from: `"Test Sender" <${process.env.SMTP_SENDER}>`,
            to: 'bavesil346@baxima.com', // <-- Replace with your test email
            subject: 'SMTP Test Email',
            text: 'This is a test email from your Node.js SMTP config.',
        });
        console.log('Test email sent:', info.messageId);
    } catch (err) {
        console.error('Error sending test email:', err);
    }
}

sendTestEmail();