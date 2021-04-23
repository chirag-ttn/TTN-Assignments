const mongoose = require('mongoose')
mongoose
.connect('mongodb://localhost:27017/users',{useNewUrlParser:true})
.catch(e=>{
    console.log('Connection error',e.message)
})

const db = mongoose.connection;

module.exports =  db;