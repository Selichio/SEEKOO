var express = require('express')
  , router = express.Router()
  , Mitarbeiter = require('../models/mitarbeiter')
  , Auth = require('../middlewares/auth')


// Routen für http://localhost:3000/mitarbeiter/*

router.get('/login', function(req, res) {
  res.render('login')
})

router.post('/login', function(req, res) {
	console.log("GET.Login")
	Mitarbeiter.processLogin(req.body.benutzername, req.body.passwort,function(err, user) {
		if(err)
		{
			//Login-Seite mit Fehlermeldung
			res.send("FEHLER: " + err)
		}
		else
		{
			req.session.user = user
			res.redirect('/mitarbeiter/intern')
		}
	})
})

router.get('/intern', Auth, function(req, res){
	res.send("Hallo Mitarbeiter " + req.session.user.vorname)
	//res.render('intern')
})
module.exports = router