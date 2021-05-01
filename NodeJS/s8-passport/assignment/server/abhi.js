async function async1(){
    console.log(1)
    setTimeout(()=>{
        console.log('async1')
    })
    console.log(2)
}
async function async2(){
    console.log(3)
    setTimeout(()=>{
        console.log('async2')
    })
    console.log(4)
}

await async1()
await async2()