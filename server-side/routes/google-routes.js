const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const GoogleUser = require('../models/google-schema.js');
const User = require('../models/user-schema.js');
const jwt = require('jsonwebtoken');

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

    if (!checkMail) {
      return res.status(400).json({ message: "User not found" });
    }

    if (checkMail) {
      const user = await User.findOne({ email: emailID });
      // console.log(user)
      if (!user) {
        return res.status(401).json({ message: "Account not found !" });
      }
      const {username, name, email, role} = user
      // console.log(name)
      jwt.sign({ id: user._id }, process.env.SECRET_KEY, {}, (err, token) => {
        if (err) {
          console.error('Error generating token:', err);
          return res.status(500).json('Internal server error - login');
        }
        // res.cookie('token', token, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        // res.cookie('username', username, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        // res.cookie("name", name, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        // res.cookie("email", email, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        // res.cookie("role", role, { httpOnly: false, expires: new Date(Date.now() + 12 * 3600000) })
        res.status(200).json({ message: 'Login successful', username, token, name, email, role });
      })
    } 
  } 

  catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/cleanup', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    
    if (err) {
      console.error('Error verifying token:', err);
      return res.sendStatus(403);
    }

    try {
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.sendStatus(401); 
      }

      if (user.role !== 'admin') {
        return res.sendStatus(403)
      }

      const Gusers = await GoogleUser.find();

      const deleting = Gusers.map(async (googleUser) => {
        const user = await User.findOne({ email: googleUser.emailID });
        if (!user) {
          return GoogleUser.deleteOne({ emailID: googleUser.emailID });
        }
      });

      await Promise.all(deleting);

      res.status(200).json({ message: 'Cleanup done' });
    } catch (error) {
      console.error('Error during cleanup:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
});


module.exports = router;