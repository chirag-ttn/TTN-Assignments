var buf = new Buffer(100)
let len = buf.write('hello')
console.log(buf.slice(0,87).toString())