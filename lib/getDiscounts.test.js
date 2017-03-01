const test = require('ava');
const getDiscounts = require('./getDiscounts');

test('getDiscounts should add no discounts if there are no apples, or soup in basketItems', t => {
    t.deepEqual(getDiscounts([]), []);
});

test('getDiscounts should add the correct number of discounts for apples in basket', t => {
    t.is(getDiscounts([ 'apples' ]).length, 1);
});

test('getDiscounts should add the correct number of discounts for soup and bread', t => {
    const basketItems = [ 'soup', 'soup', 'bread'];
    t.is(getDiscounts(basketItems).length, 1);
});

test('getDiscounts should add the correct number of discounts for soup and bread if there are more pairs of soup than bread', t => {
    const basketItems = [ 'soup', 'soup', 'soup', 'soup', 'soup', 'soup', 'bread'];
    t.is(getDiscounts(basketItems).length, 1);
});
test('getDiscounts should add the correct number of discounts for soup and bread if there are less pairs of soup than bread', t => {
    const basketItems = [ 'soup', 'soup', 'bread', 'bread'];
    t.is(getDiscounts(basketItems).length, 1);
});