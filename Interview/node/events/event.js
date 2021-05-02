let events = require('events')
let eventEmitter = new events.EventEmitter()

eventEmitter.removeListener('scream',()=>{
    console.log('I hear a scream')
})
setTimeout(()=>{
    eventEmitter.emit('scream')
},2000)