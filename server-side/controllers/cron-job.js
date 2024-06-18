const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const User = require('../models/user-schema'); 
require('dotenv').config();

const transporter = nodemailer.createTransport({
service: 'gmail', 
  auth: {
    user: process.env.OTP_MAIL,
    pass: process.env.APP_PASSWORD,
  }
});

const sendEmailToAllUsers = async () => {
  try {
    const users = await User.find();
    users.forEach(user => {
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Check out what\'s new!',
        html: 
        `<div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
        <h1 style="color: #900000;">Hello ${user.name},</h1>
        <p style="font-size: 16px;">Something new is there, go and check it out!</p>
        <p style="font-size: 16px;"><a href="${process.env.FRONTEND}" style="color: #0066cc; text-decoration: none;">Visit our site</a></p>
        </div>`
      };
      transporter.sendMail(mailOptions)
    });
  } 
  
  catch (error) {
    console.error('Error fetching users or sending emails:', error);
  }
};

const scheduleEmails = () => {
  sendEmailToAllUsers();
  schedule.scheduleJob('0 20 * * 0', () => { 
    sendEmailToAllUsers();
  });
};

module.exports = scheduleEmails;
