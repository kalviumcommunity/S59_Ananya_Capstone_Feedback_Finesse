const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.OTP_MAIL,
    pass: process.env.APP_PASSWORD 
  }
});

const sendOTPEmail = async (email, otp) => {

  const mailOptions = {
    from: 'feedbackfinesse2024@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for registration is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    // console.log(`Sent OTP: ${otp} to ${email}`);
    return otp;
  } 
  
  catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

module.exports = { sendOTPEmail };