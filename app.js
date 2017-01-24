var express = require('express');
var app = express();
var request = require('request');
var wechat = require('wechat');
var config = require('./config.json')

app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  console.log(message);

  if (message.MsgType == 'text') {
    request('http://api.qingyunke.com/api.php?key=free&appid=0&msg=' + encodeURIComponent(message.Content), function (error, response, body) {
      var replyMsg = '我现在很忙，一会儿聊哦';
      console.log(body);
      if (!error && response.statusCode == 200) {
        body = JSON.parse(body);
        replyMsg = body.content;
      }

      res.reply({type: 'text', content: replyMsg});
    })
  }
}));

app.listen(80, function () {
  console.log('App listening on port 80!');
});