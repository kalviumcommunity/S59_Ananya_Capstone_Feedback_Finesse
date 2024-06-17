const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'feedbackfinesse2024@gmail.com',
    pass: 'maod bvoe mvxm yecs' 
  }
});

const sendOTPEmail = async (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: 'feedbackfinesse2024@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for registration is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Sent OTP: ${otp} to ${email}`);
  } 

  catch (error) {
    console.error('Error sending OTP email:', error);
  }
};