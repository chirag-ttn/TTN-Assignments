var fs = require('fs')
var readable = fs.createReadStream('/home/ttn/Desktop/TTN-Assignments/Interview/node/streams/input.txt',{encoding:'utf8'})

readable.on('ready',()=>{
    console.log('I am ready to read')
})
var data = ' '

    readable.on('data',(chunk)=>{
    data +=chunk
    })
    readable.on('end',()=>{
        console.log(data)
        var writable = fs.createWriteStream('/home/ttn/Desktop/TTN-Assignments/Interview/node/streams/output.txt',{encoding:'utf8'})

async function write(){

    await writable.write(data,'utf8')
}
write()
writable.end()
    })
// console.log(data)
