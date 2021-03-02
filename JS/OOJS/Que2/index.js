// Q2. Given an array, say [1,2,3,4,5]. Print each element of an array after 3 secs.
const arr = [1,2,3,4,5];
function func(){
    arr.forEach(val=> console.log(val))
}
setTimeout(func,3000);