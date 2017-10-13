"user strict"
let express = require('express')
let session = require('express-session')
let cookieParser = require('cookie-parser')
let morgan = require('morgan')
let app = express()
let bodyParser = require('body-parser')
let url = require('url')
let path = require('path')
let debug = require('debug')('socket')
let SERVER_PORT = process.env.PORT || 5000
let fs = require('fs-extra')

app.set('port',process.env.PORT || SERVER_PORT)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: "secret seccion"}))
app.use(cookieParser())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept")
  next()
})

app.use(express.static(path.join(__dirname,'../../public/')))

let PORT = app.get('port')
let server = app.listen(PORT, function() {
  debug('Express server listening on http://localhost:' + PORT)
})

//////////////////////
// socket
let io = require('socket.io')(server)
io.sockets.on('connection', function(socket) {
  debug('a user connect!!')

  socket.on('fuck', function(o){
    debug('Get fuck :',o)
  })

  socket.on('disconnect', function(){
    debug('user disconnected')
  })
})




