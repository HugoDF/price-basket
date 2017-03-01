function getDiscounts(basketItems, itemPrices = {}) {
    let soupCount = basketItems.filter(item => item.toLowerCase() === 'soup').length;
    return basketItems.reduce((prev, curr) => {
        if (curr.toLowerCase() === 'apples') {
            prev.push({
                name: 'Apple 10% of',
                discount: 10 / 100 * itemPrices.apples
            });
        }
        if (soupCount >= 2 && curr.toLowerCase() === 'bread') {
            prev.push({
                name: 'Free bread with 2 soups',
                discount: itemPrices.bread
            });
            soupCount -= 2;
        }
        return prev;
    }, []);
}

module.exports = getDiscounts;