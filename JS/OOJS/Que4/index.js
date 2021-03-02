// Q4. Explain 3 properties of the argument object.

// The arguments object is a special construct available inside all function calls. It represents the list of arguments that were passed in when invoking the function. Since JavaScript allows functions to be called with any number args, we need a way to dynamically discover and access them.

// The arguments object is an array-like object. It has a length property that corresponds to the number of arguments passed into the function. You can access these values by indexing into the array, e.g. arguments[0] is the first argument.

// The argument object is not an array

// 1. In certain cases you can still treat arguments as an array. You can use arguments in dynamic function invocations using apply. 