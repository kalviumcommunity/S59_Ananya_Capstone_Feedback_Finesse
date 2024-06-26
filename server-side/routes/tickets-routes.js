const express = require('express');
const router = express.Router();
const { connectToDataBase } = require('../db.js');
const Ticket = require('../models/ticket.js');
const User = require("../models/user-schema.js")
const rateLimit = require('express-rate-limit')
const { manageRedis, redisClient } = require("../controllers/redis.js")
const { notifyUser } = require("../controllers/web-socket.js")

connectToDataBase();

const makePostLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 10, 
  message: 'You can only generate a specified number of tickets in a week'
})

router.use((req, res, next) => {
  req.userIdentifier = req.sessionID
  next()
})

async function invalidateCacheForAllPosts() {
  const users = await User.find();
  for (const user of users) {
    await redisClient.del(`viewpost:${user.username}`);
  }
}

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

router.get('/viewpost/:username?', manageRedis, async (req, res) => {
  const { username } = req.params
  try {
    if (username) {
      const user = await User.findOne({ username })

      if (user) {
        const data = user.role == 'admin' ? await Ticket.find() : await Ticket.find({ username })
        await redisClient.setEx(`viewpost:${username}`, 3600, JSON.stringify(data))
        return res.json(data)
      } 
      else return res.status(404).json({ error: 'User not found' })
    }
  } 
  
  catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
});



router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Ticket.findById(postId).populate('profile', 'name email username role profile');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  }

  catch (error) {
    console.error("Error fetching post", error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/makepost', makePostLimiter, async (req, res) => {
  const { username, picture, ...postDetails } = req.body;

  try {  
    if (picture.length == 0) {
      return res.status(400).json({message: "Please add relevant pictures !"})
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found with the mentioned name" });
    }
      
    const newComplaint = new Ticket({ ...postDetails, picture, username, profile: user._id });
    await newComplaint.save();
    await invalidateCacheForAllPosts()
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
    await redisClient.del(`viewpost:${blog.username}`);
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
    await redisClient.del(`viewpost:${blog.username}`);
    res.send("Item deleted successfully")
  }
  catch (error) {
    res.status(400).json({ error: "An error has been caught - delete" })
  }
})

router.post('/adminNote', async (req, res) => {
  try {
    const { postId, adminNote } = req.body;
    const post = await Ticket.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.adminNote = adminNote;
    await post.save();
    await redisClient.del(`viewpost:${post.username}`)
    notifyUser(post.username, `An admin posted a note to your ticket titled "${post.title}"`)
    res.status(200).json({ message: 'Admin note added successfully', post });
  } 
  
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateStatus', async (req, res) => {
  try {
    const { postId, status } = req.body;
    const post = await Ticket.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    post.status = status;
    await post.save();
    await redisClient.del(`viewpost:${post.username}`)
    notifyUser(post.username, `Your ticket titled "${post.title}" has been updated to ${status}`)
    res.status(200).json({ message: 'Status updated successfully', post });
  } 

  catch (error) {
    console.error("Error updating status", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
