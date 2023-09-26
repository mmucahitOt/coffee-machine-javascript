const input = require('sync-input')
const {
    IngredientsForCoffeeTypes, Modes, CoffeeTypes
} = require("./Enums");
const { conventNumberToCoffeeType } = require("./conventer")

class CoffeeMachine {
    mode = Modes.buy;

    currentWater = 400;
    currentMilk = 540 ;
    coffeeBeans = 120 ;
    currentDisposableCups = 9;
    currentMoney = 550;
    requestedCupsOfCoffee = 1;

    startCoffeeMachine() {
        while (true) {
            this.selectMode();
            this.fillTheCoffeeMachine();
            this.buyCoffee();
            this.takeMoney();
            this.printRemaining();
            if (this.mode === Modes.exit) {
                return;
            }
        }
    }
    fillTheCoffeeMachine() {
        if (this.mode === Modes.fill) {
            this.currentWater = this.currentWater + Number(input("Write how many ml of water you want to add: "));
            this.currentMilk = this.currentMilk + Number(input("Write how many ml of water you want to add: "));
            this.coffeeBeans =  this.coffeeBeans + Number(input("Write how many grams of coffee beans you want to add: "));
            this.currentDisposableCups = this.currentDisposableCups +Number(input("Write how many disposable cups you want to add: "));
            console.log();
        }
    }
    buyCoffee() {
        if (this.mode === Modes.buy) {
            const inputTypeOrBack = input("What do you want to buy?");
            if (inputTypeOrBack === "back") {
                return
            }
            const inputCoffeeNumber = Number(inputTypeOrBack);
            console.log();
            //if (!Object.keys(CoffeeTypes).includes(inputCoffeeType)) throw new Error("InvalidCoffeeType");
            const inputCoffeeType = conventNumberToCoffeeType(inputCoffeeNumber);
            switch (inputCoffeeType) {
                case CoffeeTypes.cappuccino:
                    this.makeCoffee(CoffeeTypes.cappuccino)
                    break;
                case CoffeeTypes.latte:
                    this.makeCoffee(CoffeeTypes.latte)
                    break;
                default:
                    this.makeCoffee(CoffeeTypes.espresso)
                    break;
            }
        }
    }

    takeMoney() {
        if (this.mode === Modes.take) {
            console.log(`I gave you $${this.currentMoney}`);
            console.log();
            this.currentMoney = 0;
        }
    }

    printRemaining() {
        if (this.mode === Modes.remaining) {
            this.printCurrentResources();
        }
    }

    selectMode() {
        const inputMode = input("Write action (buy, fill, take): ");
        if (!Object.values(Modes).includes(inputMode)) throw new Error("InvalidMode");
        this.mode = inputMode;
    }

    printCurrentResources() {
        console.log("The coffee machine has:");
        console.log(`${this.currentWater} ml of water`);
        console.log(`${this.currentMilk} ml of milk`);
        console.log(`${this.coffeeBeans} g of coffee beans`);
        console.log(`${this.currentDisposableCups} disposable cups`);
        console.log(`$${this.currentMoney} of money`);
        console.log();
    }


    makeCoffee(coffeeType) {
        const possibleCupCountByWater = Math.floor(this.currentWater / IngredientsForCoffeeTypes[`${coffeeType}`].waterAmountPerCup);
        const possibleCupCountByMilk = Math.floor(this.currentMilk / IngredientsForCoffeeTypes[`${coffeeType}`].milkAmountPerCup);
        const possibleCupCountByCoffeeBeans = Math.floor(this.coffeeBeans / IngredientsForCoffeeTypes[`${coffeeType}`].coffeeBeansAmountPerCup);

        let maxCupsOfCoffee = Math.min(possibleCupCountByWater, possibleCupCountByMilk, possibleCupCountByCoffeeBeans);
        if (maxCupsOfCoffee >= this.requestedCupsOfCoffee && this.currentDisposableCups > 0) {
            this.currentWater = this.currentWater - IngredientsForCoffeeTypes[`${coffeeType}`].waterAmountPerCup
            this.currentMilk = this.currentMilk - IngredientsForCoffeeTypes[`${coffeeType}`].milkAmountPerCup
            this.coffeeBeans = this.coffeeBeans - IngredientsForCoffeeTypes[`${coffeeType}`].coffeeBeansAmountPerCup
            this.currentDisposableCups = this.currentDisposableCups - 1;

            this.currentMoney = this.currentMoney + IngredientsForCoffeeTypes[`${coffeeType}`].price;
        }
    }

}


module.exports = CoffeeMachine;

/*
validateIngredients(waterAMount, milkAmount, coffeeBeans) {
    const [possibleCupsOfCoffee, remaining] = this.calculateHowManyCupsOfCoffeeCouldBeMade(waterAMount, milkAmount, coffeeBeans, this.requestedCupsOfCoffee);
    const [possibleCupsOfCoffeeWithRemaining, _] = this.calculateHowManyCupsOfCoffeeCouldBeMade(remaining.waterAmount, remaining.milkAmount, remaining.coffeeBeans);

    if (possibleCupsOfCoffee < this.requestedCupsOfCoffee) {
        console.log(`"No, I can make only ${possibleCupsOfCoffee} cups of coffee".`)
    } else {
        if (possibleCupsOfCoffeeWithRemaining > 0) {
            console.log(`Yes, I can make that amount of coffee (and even ${possibleCupsOfCoffeeWithRemaining} more than that)`)
        } else {
            console.log("Yes, I can make that amount of coffee")
        }
    }
}

 */


//Private methods

/*
calculateHowManyCupsOfCoffeeCouldBeMade(waterAmount, milkAmount, coffeeBeans, requestedCups) {
    const possibleCupCountByWater = Math.floor(waterAmount / IngredientsForCoffeeTypes.waterAmountPerCup);
    const possibleCupCountByMilk = Math.floor(milkAmount / IngredientsForCoffeeTypes.milkAmountPerCup);
    const possibleCupCountByCoffeeBeans = Math.floor(coffeeBeans / IngredientsForCoffeeTypes.coffeeBeansAmount);

    let maxCupsOfCoffee = Math.min(possibleCupCountByWater, possibleCupCountByMilk, possibleCupCountByCoffeeBeans);
    if (requestedCups && maxCupsOfCoffee > requestedCups) {
        maxCupsOfCoffee = requestedCups;
    }
    return [Number(maxCupsOfCoffee), {
        waterAmount: waterAmount - (maxCupsOfCoffee * IngredientsForCoffeeTypes.waterAmountPerCup),
        milkAmount: milkAmount - (maxCupsOfCoffee * IngredientsForCoffeeTypes.milkAmountPerCup),
        coffeeBeans: coffeeBeans - (maxCupsOfCoffee * IngredientsForCoffeeTypes.coffeeBeansAmount),
    }]
}*/
