const { spawn } = require('child_process');
const { inherits } = require('util');

// const find = spawn('find', ['.', '-type', 'f']);
// const wc = spawn('wc', ['-l']);

// find.on('error',(code,signal)=>{
//     console.log('err',code,signal)
// })
// // find.send('message')
// // process.on('data',()=>{
// //     console.log(data)
// // })
// // Can't communicate with parent or other child processes
// find.stdout.pipe(wc.stdin);

// wc.stdout.on('data', (data) => {
//   console.log(`Number of files ${data}`);
// });
// Data comes in as streams and good when data is large
// Cannot communicate with parent processed

// Use exec if you have less data and want to excecute shell commands, you can do it 
// with spawn by adding shell:true but still spawn >> exec since exec uses buffers to load
// entire data in buffer/ memory before excecuting callback so can fail if data is large

// execFile -> you can excecute the file without using shell

const cp2 = spawn('find . -type f | wc -l',{
stdio: 'inherit',
shell: true,
cwd:'/home/ttn/Desktop/TTN-Assignments',
env:{ANSWER:33},
detached:true
})
// if we have an expensive operation we can detach the child process with unref
cp2.unref()
cp2.on('data',(data)=>{
    console.log(data)
})
cp2.on('error',(err)=>{
    console.log(err)
})