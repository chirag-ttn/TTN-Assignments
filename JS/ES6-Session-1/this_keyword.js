// implicit binding

var myMethod = function(){
    console.log(this);
}

var obj = {
    myMethod:myMethod
}
console.log("Example of Implicit binding")
myMethod(); //this -> window
console.log("\n")
obj.myMethod();//this -> obj

// Explicit binding => it is done using call and apply, in this we bind the method/function to the object


var funE = function () { 
    console.log(this.a);
  };
  
  var obj1 = {
    a: 2,
    funE:funE
  };
  
  var obj2 = {
    a: 3,
    funE:funE
  };
  
  obj1.funE(); // 2
  obj2.funE(); // 3
  
  obj1.funE.call( obj2 ); // 3
  obj2.funE.call( obj1 ); // 2


//   HARD BINDING - It uses the bind function, it returns a new function that is hard-coded to call the original function , with this context set.
console.log("HARD BINDING")
var func2 = funE.bind(obj1);
func2();

console.log("PRECEDENCE ORDER: HARD-BINDING > EXPLICIT > IMPLICIT")