const express = require('express')
const app = express()
const port = process.env.PORT || 4444
app.get('/',(req,res)=>{
    res.sendFile('/home/ttn/Desktop/TTN-Assignments/NodeJS/s3-express/test-app/index.html')
})

app.listen(port,()=>{
    console.log('listening')
})