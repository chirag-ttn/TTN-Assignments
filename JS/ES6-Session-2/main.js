// 1. Filter unique array members using Set.
const arr_q1 = [12, 23, 230, 3700, 12, 23, 34];
const arr_q1Set = new Set(arr_q1);
console.log(arr_q1Set); // Unique Members in a set
console.log(Array.from(arr_q1Set)); // Unique elements from the set converted to array


// 2. Find the possible combinations of a string and store them in a MAP?
const ques2 = 'ToTheNew';
const allCombinations = (ques2) => {
    var lenStr = ques2.length;
    var result = [];
    var indexCurrent = 0;

    while (indexCurrent < lenStr) {
        var char = ques2.charAt(indexCurrent);
        var x;
        var arrTemp = [char];

        for (x in result) {
            arrTemp.push("" + result[x] + char);
        }
        result = result.concat(arrTemp);

        indexCurrent++;
    }

    return result;
};
const arr_ques2 = allCombinations(ques2);
const map_ques2 = new Map();
arr_ques2.forEach(function (item, index) {
    map_ques2.set(index, item);
});
console.log(map_ques2);

// 3. Write a program to implement inheritance upto 3 classes.The Class must  public variables and static functions.

class Person {
    first;
    last;
    age;
    gender;
    constructor(first, last, age, gender) {
        this.name = {
            first,
            last
        };
        this.age = age;
        this.gender = gender;
    }

    static greeting(x) {
        console.log(`Hi! I'm ${x.name.first}`);
    };

    static farewell(x) {
        console.log(`${x.name.first} has left the building. Bye for now!`);
    };
}
class Employee extends Person {
    id;
    constructor(first, last, age, gender, id) {
        super(first, last, age, gender);
        this.id = id;
    }
    static getID(x) {
        console.log(`${x.id} has checked in.`);
    };
}

class Developer extends Employee {
    position;
    constructor(first, last, age, gender, id, position) {
        super(first, last, age, gender, id);
        this.position = position;
    }
    static getPosition(x) {
        console.log(`${x.position} has checked out`);
    };
}


// 4. Write a program to implement a class having static functions
class User {
    static names = [];

    static isNameTaken(name) {
        return User.names.includes(name);
    }

    name = 'Unknown';

    constructor(name) {
        this.name = name;
        User.names.push(name);
    }
}

const user = new User('Archit');

console.log(User.isNameTaken('Archit'));
console.log(User.isNameTaken('Raman'));

// 5. Import a module containing the constants and method for calculating area of circle, rectangle, cylinder.
import * as cal from './modules/area.js';
console.log(`Rectangle's Area = ${cal.areaRectangle(5, 6)}`);
console.log(`Cylinder's Area = ${cal.areaCylinder(5, 6)}`);
console.log(`Circle's Area = ${cal.areaCircle(7)}`);

// 6. Import a module for filtering unique elements in an array.
import { arr_q1Set as result } from './modules/unique.js'
console.log(result);

// 7. Write a program to flatten a nested array to single level using arrow functions.
var ques7 = [[1, 2], 3, 4, [5, 6, 7, 8], [9, 11, 12]];
var myNewArray = ques7.reduce((prev, curr) => prev.concat(curr));
console.log(myNewArray);

// 8. Implement a singly linked list in es6 and implement addFirst() addLast(), length(), getFirst(), getLast(). (without using array)
class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
}

LinkedList.prototype.addFirst = function (data) {
    let newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
    return this.head;
}

LinkedList.prototype.addLast = function (data) {
    let newNode = new Node(data);
    if (!this.head) {
        this.head = newNode;
        return this.head;
    }
    let tail = this.head;
    while (tail.next !== null) {
        tail = tail.next;
    }
    tail.next = newNode;
    this.size++;
    return this.head;
}

LinkedList.prototype.getLast = function () {
    let lastNode = this.head;
    if (lastNode) {
        while (lastNode.next) {
            lastNode = lastNode.next
        }
    }
    return lastNode;
}

LinkedList.prototype.getFirst = function () {
    return this.head;
}

LinkedList.prototype.length = function () {
    return this.size;
}

// 9. Implement Map and Set using Es6?
var ques9_map = new Map();
ques9_map.set(101, 1);
ques9_map.set(102, 2);
ques9_map.set(103, 3);
console.log(ques9_map);
console.log(ques9_map.get(102));
console.log(ques9_map.has(2));
console.log(ques9_map.size);
console.log(ques9_map.keys());
console.log(ques9_map.values());
console.log(ques9_map.entries());
console.log(ques9_map.delete(103));
console.log(ques9_map.clear());
console.log(ques9_map);

var ques9_set = new Set();
ques9_set.add(1001);
ques9_set.add(1002);
ques9_set.add(1003);
console.log(ques9_set);
console.log(ques9_set.delete(1003));
console.log(ques9_set);
console.log(ques9_set.has(1001));
console.log(ques9_set.size);
console.log(ques9_set.clear());
console.log(ques9_set);

// 10. Implementation of stack (using linked list) ?
class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
}

Stack.prototype.push = function (data) {
    let newNode = new Node(data);
    if (!this.first) {
        this.first = newNode;
        this.last = newNode;
    } else {
        let temp = this.first;
        this.first = newNode;
        this.first.next = temp;
    }
    return ++this.size;
}

Stack.prototype.pop = function (data) {
    if (!this.first) {
        return null;
    }

    let temp = this.first;
    if (this.first == this.last) {
        this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.data;
}