const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const router = require('./Items/ItemRoutes');
const app = express()
const port = 3000;
// const routes = require('./user/routes')
app.use(bodyParser.json())
app.use(router)

mongoose.connect('mongodb://localhost:27017/mongo-session',{
    useNewUrlParser:"true"
})
mongoose.connection.on("error",err=>{
    console.log("err",err)
})
mongoose.connection.on('connected',(err,res)=>{
    console.log(`mongoose is connected`) 
})

app.listen(port,()=> console.log(`App is running http://localhost:${port}`))