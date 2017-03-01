#! /usr/local/bin/node
const { argv } = process;
const [node, fileName, ...basketItems] = argv;

const getBasketPrice = require('./lib/getBasketPrice');
const { formatDiscounts, formatPrice } = require('./lib/format');

function printFormattedBasket(
    { subTotal = 0, discounts = [], finalPrice = 0 },
    logger = console.log.bind(console)
) {
    logger(`Subtotal: ${formatPrice(subTotal)}`);
    logger(formatDiscounts(discounts));
    logger(`Total price: ${formatPrice(finalPrice)}`);
}

if (require.main === module) {
    printFormattedBasket(getBasketPrice(basketItems));
}

module.exports = {
    printFormattedBasket
};