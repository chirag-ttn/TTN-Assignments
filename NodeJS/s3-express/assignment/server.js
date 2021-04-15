const express = require('express')
const data = []
const app = express();
const router = require('./router/routes')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./views'))
router(app,data)
app.get('/data',(req,res)=>{
res.send(data)
})
app.listen(3000,()=>{
    console.log('listening on 3000')
})

