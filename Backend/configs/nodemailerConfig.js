const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASSWORD // Your Gmail app password
    }
});

// Function to send email
const sendEmail = async (email, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
        return info;
    } catch (error) {
        console.error('Email send error: ', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = { sendEmail };
