// Object

const friends = ["Dor", "Stav", "Or"];

const presonObject = {
  name: "chen",
  age: 44,
  myFreinds: friends,
};

// destructuring object
const person = { firsName: "John", age: 30 };
const { age: myAge, color, firsName } = person;

// destructuring an array
const myFriends = ["Dor", "Or"];
const [firstFriend, secondFriend] = myFriends;

// ternary expression
const isAdult = myAge > 18 ? "yes" : "no";

// function as first class objects

const add = function (param1, param2) {
  return param1 + param2;
};

function callFuncAftetSecond(fn, value1, value2) {}
callFuncAftetSecond(add, 2, 4);

const myArrowAdd5 = (par1) => par1 + (5 / 1000) * 9000;
[1, 2].map((v) => v * 2);
