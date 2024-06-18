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
    subject: 'OTP Verification for Your Registration',
    html: `
      <div style="border: 1px solid #ffcccc; padding: 20px; font-family: Arial, sans-serif;">
        <div style="background-color: #f0e0e0; color: #900000; text-align: center; padding: 10px; font-size: 24px;">
          OTP Verification
        </div>
        <div style="padding: 20px; font-size: 16px;">
          <p>Dear User,</p>
          <p>Your OTP for registration is:</p>
          <p style="background-color: #900000; color: #ffffff; display: inline-block; padding: 10px 20px; font-size: 20px; border-radius: 5px;">
            OTP: ${otp}
          </p>
          <p>Please enter this OTP to complete your registration.</p>
          <p>Thank you!</p>
          <p>Best regards,<br>Feedback Finesse Team</p>
        </div>
      </div>
    `
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