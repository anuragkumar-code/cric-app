const otpGenerator = require('otp-generator');

const twilioClient = require('../../config/twilio');
const { transporter } = require('../../config/mailer');

const { User } = require('../../models/userModel'); 


const generateOTP = () => {
    return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
};

const sendOTPEmail = async (to, otp) => {
    const mailOptions = {
        from: 'cric-app@example.com',
        to,
        subject: 'OTP',
        text: `Hello this is your ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Otp send to user');
    } catch (error) {
        console.error('Error sending otp on email:', error);
        throw error;
    }
}


const sendOTPSMS = async (mobile, otp) => {
    await twilioClient.messages.create({
        body: `Your OTP for verification is ${otp}.`,
        to: mobile,
        from: process.env.TWILIO_PHONE_NUMBER,
    });
};


const saveOTP = async (userId, otp) => {
    try {
        const user = await User.findByPk(userId);
        if (user) {
            user.otp = otp;
            await user.save();
        } else {
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(`Failed to save OTP: ${error.message}`);
    }
};

module.exports = {
    generateOTP,
    sendOTPEmail,
    sendOTPSMS,
    saveOTP,
};
