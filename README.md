# Price Basket in JavaScript

Price Basket implement in JavaScript. You can run it as long as `Node` v6+ is installed.

It references the Node binary at path `/usr/local/bin/node`:
```sh
$ ./PriceBasket [ basket items ]
```

If Node is installed at another location:
```sh
$ node PriceBasket
```

## Testing

We use AVA for tests, along with sinons and proxyquire.

To run the tests, first make sure these depencies are installed:
```sh
$ npm install
```

Then `npm test` or `npm t`, you can get verbose output from AVA using `npm t -- --verbose`.