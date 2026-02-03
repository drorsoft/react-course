import { useState } from "react";

const myNumber: number = 10;
const myString: string = "Hello, TypeScript!";
const myBoolean: boolean = true;

interface Person {
  name: string;
  age: number;
}

const myArray: Array<Person> = [
  {
    name: "Alice",
    age: 30,
  },
];

function makeTupple<T>(value: T): [T, T] {
  return [value, value];
}
const result = makeTupple(5);
