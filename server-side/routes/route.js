const express = require('express')
const router = express.Router()
const { connectToDataBase } = require('../db.js')
const User = require('../models/schema.js')

// connectToDataBase()
  
router.get('/', async (req, res) => {
    try {
        const user = await User.find()
        res.json(user)
        // res.send("The GET request has been completed")
    }
    catch (error) {
        res.status(500).json({error: 'An error has been caught - get'})
    }
})

router.post('/post', async (req, res) => {
    try {
        const {user} = req.body
        if (!user) {
            throw new Error('User data is required');
        }
        const data = new User({user})
        const saveData = await data.save()
        res.status(201).json(saveData)
    }
    catch (error) {
        res.status(400).json({error:error.message})
    }
})

module.exports = router