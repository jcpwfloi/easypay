# Node.js Alipay SDK

## Requirements
Node.js v7+

## API Interface

* Web Payment

| Parameter | Type | Usage |
| ---- | ---- | ---- |
| amount | String | Transaction amount (formatted "0.01") |
| name | String | Product Name |
| description | String | Product Description |
| return\_url | String | Return URL |
| notify\_url | String | Alipay official callback API |
| out\_trade\_no | String | Merchant-side identifier |

* Refund

| Parameter | Type | Usage |
| ---- | ---- | ---- |
| refund\_amount | String | Refund amount (formatted "0.01") |
| trade\_no | String | Either fill in trade\_no or out\_trade\_no to make it work |
| out\_trade\_no | String | Use merchant-side identifier to signal a refund |

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

