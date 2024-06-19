const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    rp_order_id: {
        type: String,
        required: true,
    },
    rp_payment_id: {
      type: String,
      required: true,
    },
    rp_sign: {
      type: String,
      required: true,
    }
})

const Payment = mongoose.model('payment', payment);
module.exports = Payment