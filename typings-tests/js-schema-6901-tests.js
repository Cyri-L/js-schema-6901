"use strict";
const index_1 = require("../index");
var Duck = index_1.schema({
    swim: Function,
    quack: Function,
    age: Number.min(2).max(5),
    color: ['yellow', 'brown'] //  - has either yellow or brown color
});
// Some animals
var myDuck = {
    swim: function () {
    }, quack: function () {
    }, age: 2, color: 'yellow'
}, myCat = {
    walk: function () {
    }, purr: function () {
    }, age: 3, color: 'black'
}, animals = [myDuck, myCat, {},];
// Simple checks
console.log(Duck(myDuck), Duck.errors(myDuck), Duck.jpErrors(myDuck)); // true
console.log(Duck(myCat), Duck.errors(myCat), Duck.jpErrors(myCat)); // false
