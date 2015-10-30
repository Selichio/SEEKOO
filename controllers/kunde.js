var express = require('express')
  , router = express.Router()
  , Kunde = require('../models/kunde')
  , Auth = require('../middlewares/auth')

// Routen für http://localhost:3000/1users/*


// RENDER LOGIN
router.get('/login', function(req, res) {
  res.render('login')
})
// PROCESS LOGIN
router.post('/login', function(req, res) {
	console.log("GET.Login")
	Kunde.processLogin(req.body.benutzername, req.body.passwort,function(err, user) {
		if(err)
		{
			res.send("FEHLER: " + err)
		}
		else
		{
			req.session.user = user
			//res.send("Hallo " + user.vorname + " deine Rolle: " + user.rolle)
			res.redirect('/kunde/intern')
		}
	})
})


// RENDER INTERN
router.get('/intern', Auth, function(req, res){

	// Ermittelt, ob der Kunde bereits einen Schaden gemeldet hat
	Kunde.getSchaden("lb85783", function(err, schaden){
		if(schaden)
		{
			res.send(schaden)
		}
		else
		{
			res.send("INDEX SEITE")
		}
	})
})

// RENDER ERFASSUNG
router.get('/erfassen', Auth, function(req, res){
	res.render('erfassung')
})


module.exports = router