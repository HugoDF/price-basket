const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire').noCallThru();
const getBasketPrice = require('./getBasketPrice');

test('getBasketPrice should calculate the correct subTotal given basketItems and itemPrices', t => {
    const basketItems = ['a', 'a', 'b'];
    const itemPrices = { 'a': 10, 'b': 20 };
    const expectedSubTotal = 40;
    const { subTotal: actualSubTotal } = getBasketPrice(basketItems, itemPrices);
    t.is(actualSubTotal, expectedSubTotal);
});

test('getBasketPrice should default itemPrices and calculate the correct subTotal given basketItems', t => {
    const basketItems = ['soup', 'soup', 'bread'];
    const expectedSubTotal = 65 + 65 + 80;
    const { subTotal: actualSubTotal } = getBasketPrice(basketItems);
    t.is(actualSubTotal, expectedSubTotal);
});

test('getBasketPrice should default the price of basketItems that are not in itemPrices to 0', t => {
    const basketItems = ['a', 'a', 'a'];
    const itemPrices = {};
    t.is(getBasketPrice(basketItems, itemPrices).subTotal, 0);
});

test('getBasketPrice should call getDiscounts with basketItems and itemPrices', t => {
    const basketItems = ['a', 'a', 'b'];
    const itemPrices = { 'a': 10, 'b': 20 };
    const expectedSubTotal = 40;
    const getDiscountsStub = sinon.stub();
    getDiscountsStub.returns([]);
    const getBasketPrice = proxyquire('./getBasketPrice', {
        './getDiscounts': getDiscountsStub
    });
    getBasketPrice(basketItems, itemPrices);
    t.true(getDiscountsStub.called);
    t.true(getDiscountsStub.calledOnce);
    t.true(getDiscountsStub.calledWith(basketItems, itemPrices));
});

test('getBasketPrice should calculate finalPrice correctly', t => {
    const basketItems = ['soup', 'soup', 'bread'];
    const discounts = [{ discount: 100 }, { discount: 50 }]
    const expectedFinalPrice = 65 + 65 + 80 - (100 + 50);
    
    const getDiscountsStub = sinon.stub();
    getDiscountsStub.returns(discounts);
    
    const getBasketPrice = proxyquire('./getBasketPrice', {
        './getDiscounts': getDiscountsStub
    });

    const {subTotal, finalPrice: actualFinalPrice } = getBasketPrice(basketItems);
    t.is(actualFinalPrice, expectedFinalPrice);
});

test('getBasketPrice should default total discounts to 0 if getDiscounts does no return an array', t => {
    const basketItems = ['soup', 'soup', 'bread'];
    const discounts = {};
    
    const getDiscountsStub = sinon.stub();
    getDiscountsStub.returns(discounts);
    
    const getBasketPrice = proxyquire('./getBasketPrice', {
        './getDiscounts': getDiscountsStub
    });

    const {subTotal, finalPrice } = getBasketPrice(basketItems);
    t.is(subTotal, finalPrice);
});

test('getBasketPrice should return unchanged discounts to ones returned from getDiscounts', t => {
    const basketItems = ['a', 'a', 'b'];
    const getDiscountsStub = sinon.stub();
    getDiscountsStub.returns({});
    const getBasketPrice = proxyquire('./getBasketPrice', {
        './getDiscounts': getDiscountsStub
    });
    const { discounts } = getBasketPrice(basketItems);
    t.deepEqual(discounts, {});
});