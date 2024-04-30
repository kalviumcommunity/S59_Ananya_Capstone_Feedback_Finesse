const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const Ticket = require('../models/ticket.js');

connectToDataBase();

router.get('/viewpost', async (req, res) => {
  try {
      const data = await Ticket.find()
      res.json(data)
  }
  catch (error) {
    console.error("There was an error while fetching data:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.post('/makepost', async (req, res) => {
    const post = req.body;
    try {  
      const newComplaint = new Ticket(post);
      await newComplaint.save();
      res.status(201).json({ message: 'Complaint registered successfully' });
    } 
  
    catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;