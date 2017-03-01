function formatPrice(price) {
    const poundPrice = (price / 100);
    return price >= 0 ?
        `£${poundPrice.toFixed(2)}`
        :
        `-£${(-poundPrice).toFixed(2)}`;
}

function formatDiscounts(discounts, priceFormatter = formatPrice) {
    return discounts.length === 0 ?
        '(No offers available)'
        :
        discounts
            .map(({ name, discount }) => `${name}: ${priceFormatter(discount)}`)
            .join('\n');
}

module.exports = {
    formatPrice,
    formatDiscounts
};