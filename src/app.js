const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/index");
const connectDB = require("./config/dbConfig");


async function startServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    await connectDB();
    app.use('/', router);

    app.listen(8000, () => {
        console.log("Server is running on port 8000");
    });

    return app;
}

startServer();