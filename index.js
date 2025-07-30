const nodemailer = require('nodemailer');
require('dotenv').config();

const transport = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Set in .env file
        pass: process.env.EMAIL_PASS  // App password in .env file
    }
});

async function sendMail(to, subject, htmlContent) {
    try {
        const info = await transport.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent
        });
        
        console.log('Mail sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
        
    } catch (error) {
        console.error('Error sending mail:', error);
        return { success: false, error: error.message };
    }
}

sendMail('test@gmail.com', 'TEST', 'this is content')

module.exports = { sendMail };