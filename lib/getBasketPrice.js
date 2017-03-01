const getDiscounts = require('./getDiscounts');

function sum(prev, curr) {
    return prev + curr;
}

function getBasketPrice(
    basketItems = [],
    itemPrices = {
        soup: 65,
        bread: 80,
        milk: 130,
        apples: 100
    }) {
    const subTotal = basketItems
        .map(item => itemPrices[item] || 0)
        .reduce(sum, 0);

    const discounts = getDiscounts(basketItems, itemPrices);

    const discountTotal = Array.isArray(discounts) ?
        discounts
            .map(({ discount }) => (discount))
            .reduce(sum, 0)
        :
        0;

    const finalPrice = subTotal - discountTotal;

    return {
        subTotal,
        discounts,
        finalPrice
    };
}

module.exports = getBasketPrice;