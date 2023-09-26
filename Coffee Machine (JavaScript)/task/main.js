// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')
const CoffeeMachine = require("./modules/CoffeeMachine");


const myCoffeeMachine = new CoffeeMachine();
myCoffeeMachine.startCoffeeMachine();

