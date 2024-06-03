const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const User = require('../models/user-schema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8)

connectToDataBase();

const cookieData = {
  httpOnly: false,
  secure: true, 
  sameSite: 'None' 
};

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

    const newUser = new User({ name, username, email, password: bcrypt.hashSync(password, salt), role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

    res.cookie('token', token, cookieData);
    res.cookie('username', username, { ...cookieData, httpOnly: false });
    res.cookie('name', name, { ...cookieData, httpOnly: false });
    res.cookie('email', email, { ...cookieData, httpOnly: false });
    res.cookie('role', role, { ...cookieData, httpOnly: false });
    res.status(201).json({ message: 'User registered successfully', token });

  } 

  catch (error) {
    console.error('Error during user registration:', error);
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

      res.cookie('token', token, cookieData);
      res.cookie('username', userExists.username, { ...cookieData, httpOnly: false });
      res.cookie('name', name, { ...cookieData, httpOnly: false });
      res.cookie('email', email, { ...cookieData, httpOnly: false });
      res.cookie('role', role, { ...cookieData, httpOnly: false });
      res.status(200).json({ message: 'Login successful', username, token, name, email, role });
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
  res.clearCookie('token', { ...cookieData, expires: new Date(0) });
  res.clearCookie('username', { ...cookieData, expires: new Date(0) });
  res.clearCookie('name', { ...cookieData, expires: new Date(0) });
  res.clearCookie('email', { ...cookieData, expires: new Date(0) });
  res.clearCookie('role', { ...cookieData, expires: new Date(0) });
  res.json({ message: 'Logout successful' });
}); 


module.exports = router;