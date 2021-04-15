const {execFile} = require('child_process')
const { stderr } = require('process')
const child = execFile('node',['reboot.js'],(err,stdout,stderr)=>{
    if(err){
        throw err
    }
    console.log(stdout)
})