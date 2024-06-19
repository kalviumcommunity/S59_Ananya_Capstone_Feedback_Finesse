const express = require('express')
const router = express.Router()
const Razorpay = require('razorpay')
const Payment = require('../models/payment-schema.js')
const crypto = require("crypto")
require("dotenv").config()

router.get("/get-key", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_KEY })
)

router.post("/create-order", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    })

    const options = {
      amount: Number(req.body.amount * 100), 
      currency: "INR",
    }
    const order = await instance.orders.create(options)
    if (!order) return res.status(500).send("Some error occured")
    res.json(order)
  } 
    
  catch (error) {
    res.status(500).json({error: error.message})
  }
})


router.post("/verify-payment", async (req, res) => {
  const { rp_order_id, rp_payment_id, rp_sign } = req.body

  if (!rp_sign) return res.status(400).json({message: 'Signature is undefined'})
    
  const body = rp_order_id + '|' + rp_payment_id
  
  const toget = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest('hex')
    
  const check = toget === rp_sign
  
  if (check) {
    try {
      await Payment.create({
        rp_order_id: rp_order_id,
        rp_payment_id: rp_payment_id,
        rp_sign: rp_sign,
      })
      res.status(200).json({message: 'Payment verified successfully'})
    } 
      
    catch {res.status(500).json({message: 'Unable to save payment'})}
  } 
    
  else {
    console.log(toget, rp_sign)
    res.status(500).json({message: 'Invalid signature'})
  }
})


module.exports = router