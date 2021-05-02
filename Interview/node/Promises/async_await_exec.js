
function resolveAfter2Seconds() {
    console.log("starting slow promise")
    return new Promise(resolve => {
      setTimeout(function() {
        resolve("slow")
        console.log("slow promise is done")
      }, 3000)
    })
  }
  
  function resolveAfter1Second() {
    console.log("starting fast promise")
    return new Promise((_,reject)=> {
      setTimeout(function() {
        reject('rejected')
        console.log("fast promise is done")
      }, 2000)
    })
  }

// SEQUENTIAL
  async function concurrent(){
      console.log('SEQUENTIAL START')
      await (resolveAfter2Seconds());
      await (resolveAfter1Second());
    }
    // concurrent()
// PARALLEL
async function parallel(){
    console.log('PARALLEL')
    let p1 = resolveAfter2Seconds()
    let p2 = resolveAfter1Second()
    Promise.all([p1,p2]).then(m=>console.log(m))
}
parallel()