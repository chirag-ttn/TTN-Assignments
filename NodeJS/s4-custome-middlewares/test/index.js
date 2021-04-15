const http = require('http')
const fs = require('fs')

const server = http.createServer((req,res)=>{
    const stream = fs.createReadStream('./abc.txt')
    stream.pipe(res)
    
    // console.log(stream)
})
server.listen(3000)