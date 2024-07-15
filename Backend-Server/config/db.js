const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './.env'});

// The below function is used to establish the connection to MongoDB Database
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to Databse successfully`);
    }
    catch (err){
        console.error(`Error Connecting to Database ${err}`);
        process.exit(1);
    }
}

module.exports = connectDb;