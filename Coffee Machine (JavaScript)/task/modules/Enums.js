const CoffeeTypes = {
    espresso: "espresso",
    latte: "latte",
    cappuccino: "cappuccino"
}

const IngredientsForCoffeeTypes = {
    espresso: {
        waterAmountPerCup : 250, //ml
        milkAmountPerCup : 0, //ml
        coffeeBeansAmountPerCup : 16, //g,
        price: 4
    },
    latte: {
        waterAmountPerCup : 350, //ml
        milkAmountPerCup : 75, //ml
        coffeeBeansAmountPerCup : 20,
        price: 7//g
    },
    cappuccino: {
        waterAmountPerCup : 200, //ml
        milkAmountPerCup : 100, //ml
        coffeeBeansAmountPerCup : 12,
        price: 6//g
    }
}



const Modes = {
    buy: "buy",
    fill: "fill",
    take: "take",
    remaining: "remaining",
    exit: "exit"
}



module.exports = {
    IngredientsForCoffeeTypes,
    Modes,
    CoffeeTypes,
};