var fs = require('fs');

// const { Stream } = require('node:stream')
var date1 = new Date();


var content = fs.readFile('JS-Wes-Bos.pdf',{encoding:'utf-8',flag:'r'},(err,content)=>{
    if(err) throw err
    else
    console.log('Callback will run after content is loaded')
})
var date2 = new Date();
console.log('Waiting')

console.log(date2 - date1)