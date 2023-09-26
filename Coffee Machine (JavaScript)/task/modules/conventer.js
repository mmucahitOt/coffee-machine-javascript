const {CoffeeTypes} = require("../modules/Enums")

function conventNumberToCoffeeType(number) {
    if (number === 1) {
        return CoffeeTypes.espresso;
    }
    if (number === 2) {
        return CoffeeTypes.latte;
    }
    if (number === 3) {
        return CoffeeTypes.cappuccino;
    }
}

module.exports = { conventNumberToCoffeeType }