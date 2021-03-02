// Q7. Explain 5 array methods with examples.


// PUSH
var arr = [1,2,3,4,5]
arr.push(10,11)
console.log(arr);

// POP

arr.pop();
console.log(arr)

// SLICE

console.log(arr.slice(1,5)); 

// CONCAT - creates a new array and concatenate them

var na = arr.concat(9,9,9)
console.log(na);

// forEach() - Allows to run a function for every element in an array

arr.forEach((v)=>{
    console.log(v*v)
})