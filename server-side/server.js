const app = require('./app');
const { connectToDataBase } = require("./db");

const port = 3000;

connectToDataBase()
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is running on port: ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    });
