const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const { printFormattedBasket } = require('./PriceBasket');

const noop = () => {};

test('printFormattedBasket should call log 3 times', t => {
    const loggerStub = sinon.stub();
    printFormattedBasket({}, loggerStub);
    t.true(loggerStub.calledThrice);
});

test('printFormattedBasket should call formatDiscounts once', t => {
    const formatDiscountsStub = sinon.stub();
    const printFormattedBasket = proxyquire('./PriceBasket', {
        './lib/format': { formatDiscounts: formatDiscountsStub, formatPrice: noop }
    }).printFormattedBasket;
    printFormattedBasket({}, noop);
    t.true(formatDiscountsStub.calledOnce);
});

test('printFormattedBasket should call formatPrice twice', t => {
    const formatPriceStub = sinon.stub();
    const printFormattedBasket = proxyquire('./PriceBasket', {
        './lib/format': { formatDiscounts: noop, formatPrice: formatPriceStub }
    }).printFormattedBasket;
    printFormattedBasket({}, noop);
    t.true(formatPriceStub.calledTwice);
});