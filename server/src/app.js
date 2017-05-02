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
let SERVER_PORT = process.env.PORT || 5101


app.set('port',process.env.PORT || SERVER_PORT)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: "secret seccion"}))
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
  next();
})


app.get('/',function(req,res){
  let urlParts = url.parse(req.url,true)
  let query = urlParts.query
  res.send('ok')
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
    imgurl = req.protocol + '://' + req.headers.host.split(":")[0] + ":3000/assets/images/dummy.jpg"
  }else{
    imgurl = req.protocol + '://' + req.headers.host.split(":")[0] + "/assets/images/dummy.jpg"
  }
  res.writeHead(200, { 'Content-Type':  "application/json; charset=utf-8" });
  res.end(JSON.stringify({"title":"sample title","author":"","url": imgurl,"area":"setagaya ku","link":"http://dummylink.jp"}));
})



let PORT = app.get('port')
app.listen(PORT, function() {
  debug('Express server listening on http://localhost:' + PORT)
})
