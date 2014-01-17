// Generated by CoffeeScript 1.6.3
(function() {
  var Weixin, api;

  api = require('./api');

  Weixin = (function() {
    function Weixin(options) {
      var key, val;
      for (key in options) {
        val = options[key];
        this[key] = val;
      }
    }

    Weixin.prototype.router = function(req, res, next) {
      if (req.path !== this.url) {
        return next();
      }
      if (typeof this[req.method.toLowerCase()] !== 'function') {
        return res.status(400).send('bad request');
      } else {
        return this[req.method.toLowerCase()](req, res, next);
      }
    };

    Weixin.prototype.get = function(req, res, next) {
      var echostr, nonce, signature, timestamp, val;
      signature = req.query.signature || 'a';
      timestamp = req.query.timestamp || 'b';
      nonce = req.query.nonce || 'c';
      echostr = req.query.echostr || 'd';
      val = encode(this.token, timestamp, nonce);
      if (signature === val) {
        return res.send(echostr);
      }
      return res.send("auth failed.");
    };

    Weixin.prototype.post = function(req, res, next) {
      return res.send('post');
    };

    return Weixin;

  })();

}).call(this);