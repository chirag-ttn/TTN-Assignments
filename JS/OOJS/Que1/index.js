// Q1. Create a hierarchy of person, employee and developers.

function person(name,age,gender)
{
    this.name = name;
    this.age = age;
    this.gender = gender;
}
function person(name,age)
{
    this.name = name;
    this.age = age;
}
function employee(id,desgination)
{
    this.id = id;
    this.desgination = desgination;
}
function developer(skill)
{
    this.skill = skill;
}

// Now we can associate the developer with person or employee by adding the function of person or employee in prototype of developer

employee.prototype = new person('Chirag',22,'M')
var e1 = new employee();
console.log(e1,e1.__proto__)

developer.prototype = new employee(123,'Trainee')

var d1 = new developer('JS');
console.log(d1)
console.log(d1.__proto__)
console.log(d1.__proto__.__proto__)

// In the abv example developer object is child of employee and employee is of person