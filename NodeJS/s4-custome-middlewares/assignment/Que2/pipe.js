const fs = require('fs')

const ReadStream = fs.createReadStream('./chirag.txt',{highWaterMark:100})

const writeStream  = fs.createWriteStream('./output.txt')

ReadStream.pipe(writeStream)