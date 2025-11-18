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

console.log(firstFriend);

// ternary expression
const isAdult = myAge > 18 ? "yes" : "no";

// function
