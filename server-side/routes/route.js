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

module.exports = router