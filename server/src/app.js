"user strict"
let express = require('express')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let morgan = require('morgan')
let app = express()
let bodyParser = require('body-parser')
let url = require('url')
let path = require('path')
let debug = require('debug')('api')
let OAuth = require('oauth').OAuth
let SERVER_PORT = process.env.PORT || 5101


app.set('port',process.env.PORT || SERVER_PORT)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: "skjghskdjfhbqigohqdiouk"}))
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
})


let oa = new OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "UultBHSFWtj2b4ZwamnqVdcfy", //twitter appで発行されたConsumer keyを入力。
  "keqNnR1bdb4PteNFmmzz6zLlBdRmqv9xfPOBOgJra5IqHYiRJm", //twitter appで発行されたConsumer secretを入力。
  "1.0",
  "http://127.0.0.1:5000/auth/twitter/callback",
  "HMAC-SHA1"
)

app.get('/',function(req,res){
  let urlParts = url.parse(req.url,true)
  let query = urlParts.query
  res.send('ok')
})

app.get('/auth/twitter', function(req, res){

  oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
    if(error) {
      console.log(error)
      res.send("yeah. no didn't work")
    }else{
      req.session.oauth = {};
      req.session.oauth.token = oauth_token;
      console.log('oauth.token: ' + req.session.oauth.token);
      req.session.oauth.token_secret = oauth_token_secret;
      console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
      res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
    }
  })
})

app.get('/auth/twitter/callback', function(req, res, next){
  console.log(req.session)
  if (req.session.oauth) {
    req.session.oauth.verifier = req.query.oauth_verifier;
    var oauth = req.session.oauth;
    oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier, 
    function(error, oauth_access_token, oauth_access_token_secret, results){
      if (error){
        console.log(error);
        res.send("yeah something broke.");
      } else {
        req.session.oauth.access_token = oauth_access_token;
        req.session.oauth.access_token_secret = oauth_access_token_secret;
        console.log(results);

        oa.get(
          'https://api.twitter.com/1.1/account/verify_credentials.json',
          oauth_access_token,
          oauth_access_token_secret,
          function (e, data, res){
            console.log(res)
            console.log(data)
            // res.end(data)
          })

        res.send("worked. nice one.");
      }
    });
  } else {
    next(new Error("you're not supposed to be here."));
  }
})

app.get('/api/params', function(req, res){


  res.writeHead(200, { 'Content-Type':  "application/json; charset=utf-8" });
  let s0 = [Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10]
  let s1 = [Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10]
  let s2 = [Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10]
  let s3 = [Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10]
  let s4 = [Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10]
  let s5 = [Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10,Math.ceil(Math.random()*10)/10]
  res.end(JSON.stringify({"params":[{"type":0,"scores":s0},{"type":1,"scores":s1},{"type":2,"scores":s2},{"type":3,"scores":s3},{"type":4,"scores":s4},{"type":5,"scores":s5}]}));
})

app.post('/api/book', function(req, res){
  let imgurl = ''
  if(req.headers.host.indexOf('localhost') != -1){
    imgurl = req.protocol + '://' + req.headers.host.split(":")[0] + ":3000/assets/images/bookdummy.jpg"
  }else{
    imgurl = req.protocol + '://' + req.headers.host.split(":")[0] + "/assets/images/bookdummy.jpg"
  }
  res.writeHead(200, { 'Content-Type':  "application/json; charset=utf-8" });
  res.end(JSON.stringify({"title":"なぜ関西のローカル大学「近大」が、志願者数日本一になったのか","author":"山下 柚実","url": imgurl,"area":"CHALLENGE NOAH 24","link":"http://dummylink.jp"}));
})



let PORT = app.get('port')
app.listen(PORT, function() {
  debug('Express server listening on http://localhost:' + PORT)
})
