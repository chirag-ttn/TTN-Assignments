var fs = require('fs');

// const { Stream } = require('node:stream')
var date1 = new Date();


var content = fs.readFileSync('file.txt',{encoding:'utf-8',flag:'r'})
var date2 = new Date();
console.log('Waiting')

console.log(date2 - date1)