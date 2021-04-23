const fs = require('fs')

var streamReader = fs.ReadStream('./chirag.txt',{highWaterMark:10})
let data = '';
streamReader.on('data',(chunk)=>{
    console.log('=====================================================')
    console.log(chunk.toString())
    data=data+chunk.toString();

})


streamReader.on('end',()=>{
    console.log(data)
})