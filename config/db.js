const mongoose = require('mongoose');

require('dotenv').config();

exports.connect= ()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        dbName:"Vigovia",
    }).then(()=>console.log("db connect")).catch((error)=>{
        console.log("error occured"+ error)
        process.exit(1)
    })
}