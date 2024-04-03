const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const route = require("./routes/route")

const {connectToDataBase, disconnectToDataBase} = require("./db")

app.use("/", route)
app.use(express.json())

app.get('/', (req, res) => {
    const status = mongoose.connection.readyState == 1 ? 'Connected 😎😎' : 'Not Connected 😓😓'
    res.send(`Your DataBase connection status is: ${status} ${req.body}`)
})
  
app.listen(port, async () => {
    await connectToDataBase()
    console.log(`The server is running on port: ${port}`)
})