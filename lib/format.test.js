const test = require('ava');
const sinon = require('sinon');
const {
    formatPrice,
    formatDiscounts
} = require('./format');

test('formatPrice should return the correct string for a positive price', t => {
    const price = 100;
    const expectedOutput = `£1.00`;
    const actualOutput = formatPrice(price);
    t.is(expectedOutput, actualOutput);
});

test('formatPrice should return the correct string for a 0 price', t => {
    const price = 0;
    const expectedOutput = `£0.00`;
    const actualOutput = formatPrice(price);
    t.is(expectedOutput, actualOutput);
});

test('formatPrice should return the correct string for a negative price', t => {
    const price = -100;
    const expectedOutput = `-£1.00`;
    const actualOutput = formatPrice(price);
    t.is(expectedOutput, actualOutput);
});

test('formatDiscounts should return \'(No offers available)\' when pass an empty array', t => {
    t.is(formatDiscounts([]), '(No offers available)');
});

test('formatDiscounts should return text containing the correct number of newlines when passed a non-empty array', t => {
    const numberOfNewlines = formatDiscounts([{},{},{},]).match(/[\n]/g).length;
    t.is(numberOfNewlines, 2);
});

test('formatDiscounts should call passed priceFormatter the correct number of times when passed a non-empty array', t => {
    const priceFormatter = sinon.stub();
    formatDiscounts([{},{},{},], priceFormatter);
    t.true(priceFormatter.calledThrice);
});