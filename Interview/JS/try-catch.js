function checkString(x) {
    
    if (typeof x == 'number') throw new Error('You must provide a string')
    return Number(x)
}
let x,y = 10;
try{
    if(typeof y == 'number') throw new Error("Enter string")
    x = checkString(y)
}
catch(err)
{
    console.log('Error',err)
}
finally{
    console.log(x)
}