# Node.js Alipay SDK

## Requirements
Node.js v7+

## Example

* Web Payment

```
var fs = require('fs');
var alipay = require('./lib')

var Alipay = new alipay({
  privateKey: fs.readFileSync('./app_private_key.pem'),
  publicKey: fs.readFileSync('./app_public_key.pem'),
  app_id: 'your_app_id'
})

console.log(Alipay.webPayment({
  amount: "0.01",
  name: 'iPhone X'
}))
```

* Refund

```
var fs = require('fs');
var alipay = require('./lib')

var Alipay = new alipay({
  privateKey: fs.readFileSync('./app_private_key.pem'),
  publicKey: fs.readFileSync('./app_public_key.pem'),
  app_id: 'your_app_id'
})

Alipay.refund({
  refund_amount: '1.00',
  trade_no: 'your_trade_no'
}).then((body) => {
  console.log(body);
}).catch((err) => {
  console.log('ERR: ' + err);
});
```

