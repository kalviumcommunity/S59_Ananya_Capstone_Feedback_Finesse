const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
const route = require("./routes/route")

const {connectToDataBase, disconnectToDataBase} = require("./db")

// connectToDataBase()

app.use(express.json()) 
app.use("/api", route)


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