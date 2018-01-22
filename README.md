# Node.js Alipay SDK

## Requirements
Node.js v7+

## Example

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
