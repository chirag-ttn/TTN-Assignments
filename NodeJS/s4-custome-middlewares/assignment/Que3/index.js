const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()
let username = ''
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile('./form.html',{root:'/home/ttn/Desktop/TTN-Assignments/NodeJS/s4-custome-middlewares/assignment/Que3'})
})
app.post('/getUsername',(req,res)=>{
    console.log(req.body)
    username = req.body.username   
    fetch('https://api.github.com/users/'+username)
    .then((data)=>{
        data.toString('utf8')
        data = data.json()
        .then(data=>res.send(data))
        
    })
    .catch((err)=>{
        console.log('ERROR',err)
    })
})

app.listen(3000)