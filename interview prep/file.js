const Person = function (firstName) {
    this.firstName = firstName;
    this.sayName1 = function () {
      console.log(this.firstName);
    };
    this.sayName2 = () => {
      console.log(this.firstName);
    };
  };
  
  const john = new Person('John');
  const dave = new Person('Dave');
  
  john.sayName1(); //john
  john.sayName2(); //john
  
  // arrow function this will point to the object in which it existed at time of creation
  john.sayName1.call(dave); //Dave
  john.sayName2.call(dave); //john
  
  john.sayName1.apply(dave); //Dave
  john.sayName2.apply(dave); //john
  
  john.sayName1.bind(dave)();   //dave
  john.sayName2.bind(dave)();   //dave
  
  var sayNameFromWindow1 = john.sayName1;
  sayNameFromWindow1();     //john
  
  var sayNameFromWindow2 = john.sayName2;
  sayNameFromWindow2();     //john