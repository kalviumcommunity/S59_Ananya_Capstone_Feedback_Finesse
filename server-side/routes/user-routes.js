const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const User = require('../models/user-schema.js');

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

    const newUser = new User({ name, username, email, password, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } 

  catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username && password) {
      const user = await User.findOne({ username, password });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      const { name, email, role } = user;
      res.status(200).json({ message: 'Login successful', user, username, name, email, role });
    } 
  } 
  
  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;