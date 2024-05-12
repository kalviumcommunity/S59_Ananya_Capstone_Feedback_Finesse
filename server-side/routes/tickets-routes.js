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
      const {picture} = req.body
      if (picture.length == 0) {
        return res.status(400).json({message: "Please add relevant pictures !"})
      }
      const newComplaint = new Ticket(post);
      await newComplaint.save();
      res.status(201).json({ message: 'Complaint registered successfully' });
    } 
  
    catch (error) {
      if (error.name === "ValidationError") {
        console.error("Validation error was detected", error);
        res.status(400).json({ message: 'Validation error', error: error.message });
      } 
      
      else {
        console.error("Server error was detected", error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
});

router.patch('/update/:id', async (req, res) => {
  try {
    const blog = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new : true })    
    if (!blog) {
      return res.status(404).json("No result found"); 
    }
    res.json(blog)
  }
  catch (error) {
    res.status(500).json({error: "An error has been caught"})
  }
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const blog = await Ticket.findByIdAndDelete(req.params.id)
    if (!blog) {
      return res.status(404).json("No result found"); 
    }
    res.send("Item deleted successfully")
  }
  catch (error) {
    res.status(400).json({ error: "An error has been caught - delete" })
  }
})


module.exports = router;