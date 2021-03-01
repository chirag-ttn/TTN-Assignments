// Given this array: `[3,62,234,7,23,74,23,76,92]`, Using arrow function, create an array of the numbers greater than `70`.

var arr = [3,62,234,7,23,74,23,76,92];

var newarr = arr.filter((val)=>{
    return val>70;
})
console.log(newarr)

// Note: filter() does not change the original array.

