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
	res.render('erfassen')
})

router.post('/erfassen', function(req, res){
	//Erfassung des Schadens
	console.log("Kunde.erfassen")
	
	var schaden = {
	"marke" : req.body.marke,
	"model"      : req.body.model,
	"datum"      : req.body.datum,
	"uhrzeit"      : req.body.uhrzeit,
	"unfallhergang"      : req.body.unfallhergang,
	"unfallort"      : req.body.unfallort,
	"halter"      : req.body.halter,
	"verursacher"      : req.body.verursacher,
	"sonstiges"  : req.body.username,
	"status"   : "opened",
	"rechnung" : "",
	"kostenvoranschlag" : "",
	"fahrzeugbewertung" : "",
	"bilder" : req.files,
	"Melder"    : req.session.user
	}
	Kunde.addSchaden(schaden, function(err){
		if(err)
		{
			res.render("Fehler beim erfassen")
		}
		else
		{
			res.render("controllcenter", schaden)
		}
	})
})

module.exports = router