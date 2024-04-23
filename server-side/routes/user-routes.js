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
  const { name, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ username, email });

    if (existingUser) {
      return res.status(400).json({ message: "Already have an account with the entered credential(s)" });
    }

    const newUser = new User({ name, username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } 

  catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;