/**
* 图灵机器人
**/

var request = require('request');
var config = require('../config.json').engine.tuling;

function reply(info, userid, callback) {
  request(
    { 
      method: 'POST',
      uri: 'http://www.tuling123.com/openapi/api',
      form: {
        key: config.key,
        info: info,
        userid: userid
      }
    }
  , function (error, response, body) {
      console.log(body);
      if(error || response.statusCode != 200){
        callback(null);
        return;
      }
      var body = JSON.parse(body);
      if (body.code != 100000) {
        callback(null);
        return;
      }
      callback(body.text);
    }
  )
}

module.exports = {
  reply: reply
}