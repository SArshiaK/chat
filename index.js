const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT || 3000
const app = express();
const apiRouter = require('./src/router')
const path = require('path');
const handleResponse = require("./src/middleware/handleResponse");
const {mongoConnect, mongoDisconnect} = require('./src/db/mongo')

app.use(express.json());
app.use('/api', handleResponse, apiRouter);
app.use('/public', express.static(path.join(__dirname, './public')));


async function startServer(){
    await mongoConnect();
    
    app.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}🔥`);
    });
};

startServer();
