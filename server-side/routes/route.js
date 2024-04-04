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
        res.json({error: 'An error has been caught - get'})
    }
})

router.post('/post', async (req, res) => {
    try {
        const {user} = req.body
        const data = new User({user})
        const saveData = await data.save()
        res.status(201).json(saveData)
    }
    catch (error) {
        res.json({error:error.message})
    }
})

module.exports = router