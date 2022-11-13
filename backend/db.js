const mongoose = require('mongoose');

// const mongoURI="mongodb://127.0.0.1:27017/iNoteBook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.3";
const mongoURI="mongodb+srv://anshul:qwertyuiop@cluster0.rvmze0j.mongodb.net/iNoteBook?retryWrites=true&w=majority"

const connectToMongo =()=>{
         mongoose.connect(mongoURI,()=>{
                console.log("connected to Mongo Successfully");
         })
}

module.exports = connectToMongo;
