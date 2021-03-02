Explain difference between Bind and Call (example).

// BIND
// a. It is used to fix the value of this to a specific object (called context object)
// b. The Bind method returns a new function, allowing us to pass in this array and any number of arguments. 
// c. Used when we want that function to later be called with a certain context like events.

var obj = {a:1};

var add = function(){
    console.log(this.a + 1)
}
var new_add = add.bind(obj);//a new function new_add will be created and (this of new_add) will get set to obj
new_add();


// CALL
// It is an alternate means to invoke the function.
// The method Call invokes the function and allows us to pass in arguments one by one using commas

add.call(obj) //The call method sets the this inside the function and immediately executes that function.-> donot create a copy

