const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const GoogleUser = require('../models/google-schema.js');
const User = require('../models/user-schema.js');

connectToDataBase();

router.get('/', async (req, res) => {
  try {
      const user = await GoogleUser.find()
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
  const { name, emailID, role } = req.body;
  try {
    const existingEmail = await GoogleUser.findOne({ emailID });
    const check = await User.findOne({ emailID })

    if (existingEmail || check) {
      return res.status(400).json({ message: "An account already exists with the entered email" });
    }

    const newUser = new GoogleUser({ name, emailID, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } 

  catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/signin', async (req, res) => {
  const { emailID } = req.body;
  try {
    const checkMail = await GoogleUser.findOne({ emailID })
    if (checkMail) {
      const user = await User.findOne({ email: emailID });
      // console.log(user)
      if (!user) {
        return res.status(401).json({ message: "Account not found !" });
      }
      const { username, name, email, role } = user;
      return res.status(200).json({ message: 'Login successful', username, name, email, role });
    } 
    else {
      return res.status(400).json({ message: "User not found" })
    }
  } 

  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;