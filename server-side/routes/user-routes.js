const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const User = require('../models/user-schema.js');
const Guser = require("../models/google-schema.js")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8)
const sendOTPEmail = require("../controllers/verify-otp.js")

connectToDataBase();

router.get('/', async (req, res) => {
  try {
    const user = await User.find()
    res.json(user)
  }
  catch (error) {
    console.error("There was an error while fetching users:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ error: "There was a validation error" });
    } 
    
    else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
})

router.post('/signup', async (req, res) => {
  const { name, username, email, password, role } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingEmail) {
      return res.status(400).json({ message: "An account already exists with the entered email" });
    }

    if (existingUsername) {
      return res.status(400).json({ message: "An account already exists with the entered username" });
    }

    const googleUser = await Guser.findOne({ email }); 
    if (googleUser) {
      const newUser = new User({ name, username, email, password: bcrypt.hashSync(password, salt), role, verify: true });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    }

    const newUser = new User({ name, username, email, password: bcrypt.hashSync(password, salt), role });
    await newUser.save();

    await sendOTPEmail(email);

    res.status(201).json({ message: 'User registered successfully. Please verify your OTP to complete registration.' });
  } 
  catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    user.verify = true;
    user.otp = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    const { name, username, role } = user;

    res.status(200).json({ message: 'OTP verified successfully', token, username, name, role });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.status(400).json('User not found');
    }
    const { name, email, role} = userExists
    const passwordCheck = bcrypt.compareSync(password, userExists.password);
    // console.log(passwordCheck)

    if (passwordCheck) {
      const token = jwt.sign({ id: userExists._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const tosend = {
        message: 'Login successful', username, token, name, email, role
      }
      res.status(200).json(tosend);
    } 
    
    else {
      res.status(400).json('Wrong credentials');
    }
  } 

  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
}); 


module.exports = router;