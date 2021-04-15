// new Promise((resolve,reject)=>{
//     console.log('Created promise')
//     reject()
// }).then(()=>{
//     throw new Error('Something went wrong')
//     console.log('Will this print')
// }).then(()=>{
//     console.log('After catch');
// })
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(0).then(() => console.log(4));
Promise.resolve().then(() => console.log(2)).then(() => console.log(3));
console.log(1); // 1, 2, 3, 4