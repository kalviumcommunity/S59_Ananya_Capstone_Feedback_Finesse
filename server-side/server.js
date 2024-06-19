const app = require('./app');
const { connectToDataBase } = require("./db");
const scheduleEmails = require("./controllers/cron-job")

const port = 3000;

connectToDataBase()
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is running on port: ${port}`);
            scheduleEmails()
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
