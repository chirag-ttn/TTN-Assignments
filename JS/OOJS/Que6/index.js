// Q6. Create a counter using closures.

function counter(){
    var c = 0;
    function incCounter(){
        return c+=1;
    };
    return incCounter;
}
var ctr = counter();
setInterval(()=>{
    console.log(ctr())
},1000)

// Closure is nothing but when any inner function is called it keeps track of outer variables,
// In this case c is an outer variable
// 