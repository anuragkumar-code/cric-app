const { transporter } = require('../../config/mailer');

const sendWelcomeEmail = async (to, name) => {
    const mailOptions = {
        from: 'cric-app@example.com',
        to,
        subject: 'Welcome to Our Service',
        text: `Hello ${name},\n\nWelcome to our service! We're glad to have you on board.\n\nBest regards,\nThe Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully');
    } catch (error) {
        console.error('Error sending welcome email:', error);
        throw error;
    }
}

module.exports = {
    sendWelcomeEmail
};
