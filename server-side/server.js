const app = require('./app');
const http = require("http")
const { connectToDataBase } = require("./db");
const scheduleEmails = require("./controllers/cron-job")
const { makeWebSocket } = require("./controllers/web-socket")

const server = http.createServer(app)
makeWebSocket(server)

const port = 3000;

connectToDataBase()
    .then(() => {
        server.listen(port, () => {
            console.log(`The server is running on port: ${port}`);
            scheduleEmails()
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
