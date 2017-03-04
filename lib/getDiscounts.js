// A solution should be simple enough, but not too simple
function getDiscounts(basketItems, itemPrices = {}) {
    let soupCount = basketItems.filter(item => item === 'soup').length;
    return basketItems.reduce((prev, curr) => {
        // With only 2 discount rules, creating an 'extendable'
        // policies system that would just take basketItems and itemPrices
        // and do whatever it wants with them.
        if (curr === 'apples') {
            prev.push({
                name: 'Apple 10% of',
                discount: 10 / 100 * itemPrices.apples
            });
        }
        if (soupCount >= 2 && curr === 'bread') {
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