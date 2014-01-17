
api = require('./api')

class Weixin

  constructor: (options) ->
    for key, val of options
      @[key] = val

  router: (req, res, next) ->
    return next() unless req.path is @url
    if typeof @[req.method.toLowerCase()] isnt 'function'
      res.status(400).send('bad request')
    else @[req.method.toLowerCase()](req, res, next)

  get: (req, res, next) ->

    signature = req.query.signature or 'a'
    timestamp = req.query.timestamp or 'b'
    nonce = req.query.nonce or 'c'

    echostr = req.query.echostr or 'd'

    val = encode(@token, timestamp, nonce)
    if signature is val
      return res.send(echostr)
    res.send("auth failed.")

  post: (req, res, next) ->
    res.send('post')
