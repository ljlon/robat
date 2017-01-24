var express = require('express');
var app = express();
var request = require('request');
var wechat = require('wechat');
var tuling = require('./engine/tuling');
var config = require('./config.json').wechat

app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
  var message = req.weixin;
  console.log(message);

  if (message.MsgType == 'text') {
    tuling.reply(message.Content, message.FromUserName, function(replyMsg) {
      res.reply({
        type: 'text', 
        content: replyMsg?replyMsg:'我现在有点忙哦，一会再聊吧'
      });
    })
  }
}));

app.listen(80, function () {
  console.log('App listening on port 80!');
});