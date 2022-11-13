const mongoose = require('mongoose');

const mongoURI="connection url"

const connectToMongo =()=>{
         mongoose.connect(mongoURI,()=>{
                console.log("connected to Mongo Successfully");
         })
}

module.exports = connectToMongo;
