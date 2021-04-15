const {exec} = require('child_process')

exec('echo "Hello from reboot"',(err,stdout,stderr)=>{
    if(err) throw err
    console.log(stdout)
})