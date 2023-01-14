require('dotenv').config()
const mongoose = require('mongoose');
const options = {
    user: process.env.DB_USERNAME,
    pass: process.env.DB_PASSWORD,
    authSource: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true
};
//protocol://username:password@host:port/database_name
//mongodb://admin:adminpassword@localhost:27017/admin
mongoose.connect(process.env.MONGODB_URL,
    options,
    (err) => {
        if(err){
            console.log(`Cannot connect to database!` + err);
        } else {
            console.log(`Connected to ${process.env.DB_SCHEMA}`);
        }
    });

module.exports = mongoose;