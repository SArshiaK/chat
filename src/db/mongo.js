const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL
console.log(MONGODB_URL)
mongoose.connection.once('open', () => {
    console.log('Mongodb connection is ready', MONGODB_URL);
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

mongoose.set('strictQuery', true);

async function mongoConnect(){
    await mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}


module.exports = {mongoConnect, mongoDisconnect}