
async function async1() {
    console.log(1)
    
        await new Promise(resolve=>setTimeout(() => {
            console.log('async1')
            resolve()
        }, 3000)
        )
    console.log(2)
    


}
async function async2() {
    console.log(3)
    
        await new Promise(resolve=>setTimeout(() => {
            
            console.log('async2')
            resolve()
            
        }, 3000)
    )
    console.log(4)
    

}
(async () => {
    await async1()
    
    await async2()
    
    
    
})()