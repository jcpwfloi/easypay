var request = require('request');
var format = require('dateformat');
var querystring = require('querystring');
var crypto = require('crypto');

var url = 'https://openapi.alipay.com/gateway.do';

class Alipay {

  /*
   * Class Alipay
   *  Alipay API Node.js SDK
   *  Author: arcGravitus
   *  GitHub: https://github.com/jcpwfloi
   *
   *
   */

  constructor ({ privateKey, publicKey, app_id }) {
    this.config = {
      privateKey: String(privateKey), publicKey: String(publicKey), app_id
    };
  }

  getFormData ({ biz_content, return_url, notify_url, method }) {
    return {
      app_id: this.config.app_id,
      method: method || 'alipay.trade.page.pay',
      return_url: return_url || this.config.return_url || null,
      charset: 'utf-8',
      sign_type: 'RSA2',
      timestamp: format(new Date(), 'yyyy-mm-dd HH:MM:ss'),
      version: '1.0',
      notify_url: notify_url || this.config.notify_url || null,
      biz_content: JSON.stringify(biz_content)
    };
  }

  getSignature(data) {
    let sorted = {};

    Object.keys(data).sort().forEach(key => {
      if (data[key] != '' && data[key] != null) sorted[key] = data[key];
    });

    let title = querystring.stringify(sorted);
    title = decodeURIComponent(title);

    let signer = crypto.createSign('RSA-SHA256');
    let result = signer.update(new Buffer(title, 'utf-8')).sign(this.config.privateKey, 'base64');

    return result;
  }

  generateURIByForm(data) {
    var sorted = data;

    sorted.sign = this.getSignature(data);

    return url + '?' + querystring.stringify(sorted);
  }

  generalGetRequest(data) {
    var sorted = data;

    sorted.sign = this.getSignature(data);

    return new Promise((resolve, reject) => {
      request.get(
        url + '?' + querystring.stringify(sorted)
      , (err, res, body) => {
        if (err)
          reject(err);
        else resolve(body);
      });
    });
  }

  webPayment ({ amount, name, description, return_url, notify_url, out_trade_no }) {

    var biz_content = {
      out_trade_no: out_trade_no || format(new Date(), 'yyyymmddHHMMssl'),
      product_code: 'FAST_INSTANT_TRADE_PAY',
      total_amount: amount,
      subject: name,
      description: description || null
    };

    var form = this.getFormData({
      biz_content, return_url, notify_url
    });

    return this.generateURIByForm(form)
  }

  refund ({ refund_amount, trade_no, out_trade_no }) {
    var form = this.getFormData({
      biz_content: {
        refund_amount,
        trade_no,
        out_trade_no
      },
      method: 'alipay.trade.refund'
    });

    return this.generalGetRequest(form)
  }

}

module.exports = Alipay;

