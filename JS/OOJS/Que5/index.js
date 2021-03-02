// Q5. Create a function which returns the number of invocations and number of instances of a function.

var fun = function(name){
    
    this.name = name;
    counter++;
}

var counter = 0;

// Now the inner function fun takes counter in its clousre and remeber it

var c1 = new fun();
var c2 = new fun();
fun('Chirag')
console.log('Total invocation and instances are', counter)