var express = require('express')
  , app = express()
  , bodyParser = require('body-parser')
  , expressSession = require('express-session')
  , port = process.env.PORT || 3000

app.set('views', __dirname + '/views')
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressSession(
  {
    secret:'sekolifestyle',
    resave: true,
    saveUninitialized: true
  })
);

app.use(require('./controllers'))


app.listen(port, function() {
  console.log()
console.log()
console.log()
console.log()
console.log("#===========================================#")
console.log("#===========================================#")
console.log()
console.log("     ######  ######   ==   ##  ## ######")
console.log("     ##      ##            ## ##  ##  ##")    
console.log("     ######  ######   ==   ###    ##  ##")
console.log("         ##  ##            ## ##  ##  ##") 
console.log("     ######  ######   ==   ##  ## ######")
console.log()
console.log("#===========================================#")
console.log("#    SEKO-Server is listen on port: " + port + "    #")
console.log("#===========================================#")

})