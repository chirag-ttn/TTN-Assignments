const p1 = new Promise((res,rej)=>{
    rej(10)
    
    
})
const p2 = new Promise((res,rej)=>{
    setTimeout(()=>rej(10),1000)
    
})

Promise.any([p1,p2]).then(val=> console.log(val)).catch(err=>console.log('err'))