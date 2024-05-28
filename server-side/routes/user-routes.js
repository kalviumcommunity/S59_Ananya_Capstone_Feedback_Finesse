const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const User = require('../models/user-schema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(8)

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

    const newUser = new User({ name, username, email, password: bcrypt.hashSync(password, salt), role });
    await newUser.save();

    jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {}, (err, token) => {
      if (err) {
        console.error('Error generating token:', err);
        return res.status(500).json('Internal server error - login');
      }
      res.cookie('token', token, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
      res.cookie('username', username, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
      res.cookie("name", name, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
      res.cookie("email", email, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
      res.cookie("role", role, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
      res.status(201).json({ message: 'User registered successfully', token });
    })
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
      jwt.sign({ id: userExists._id }, process.env.SECRET_KEY, {}, (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          return res.status(500).json('Internal server error - login');
        }
        res.cookie('token', token, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        res.cookie('username', userExists.username, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        res.cookie("name", name, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        res.cookie("email", email, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        res.cookie("role", role, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        res.status(200).json({ message: 'Login successful', username, token, name, email, role });
      })
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
  res.clearCookie('token',{expires:new Date(0), httpOnly: true});
  res.clearCookie('username', {expires:new Date(0), httpOnly: true});
  res.clearCookie('name', {expires:new Date(0), httpOnly: true});
  res.clearCookie('email', {expires:new Date(0), httpOnly: true});
  res.clearCookie('role', {expires:new Date(0), httpOnly: true});
  res.json({ message: 'Logout successful' });
}); 


module.exports = router;