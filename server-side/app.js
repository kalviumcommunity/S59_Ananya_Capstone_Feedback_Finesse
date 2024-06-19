require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose')
const route = require("./routes/route");
const user = require("./routes/user-routes");
const ticket = require("./routes/tickets-routes");
const google = require("./routes/google-routes");
const payment = require("./routes/payment-routes")

const app = express();

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', process.env.FRONTEND]
}));
app.use(cookieParser());

app.use("/api", route);
app.use("/register", user);
app.use("/complaint", ticket);
app.use("/google", google);
app.use("/payment", payment)

app.get('/', (req, res) => {
  const status = mongoose.connection.readyState == 1 ? 'Connected 😎😎' : 'Not Connected 😓😓';
  res.send(`Your DataBase connection status is: ${status}`);
});

module.exports = app;
