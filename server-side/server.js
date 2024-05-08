const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const route = require("./routes/route")
const user = require("./routes/user-routes")
const ticket = require("./routes/tickets-routes")
const google = require("./routes/google-routes")
const cors = require('cors')

const {connectToDataBase, disconnectToDataBase} = require("./db")

// connectToDataBase()

app.use(cors())
app.use(express.json()) 
app.use("/api", route)
app.use("/register", user)
app.use("/complaint", ticket)
app.use("/google", google)

app.get('/', (req, res) => {
    const status = mongoose.connection.readyState == 1 ? 'Connected 😎😎' : 'Not Connected 😓😓'
    res.send(`Your DataBase connection status is: ${status} ${req.body}`)
})
  
connectToDataBase()
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });