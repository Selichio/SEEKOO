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
			res.render("error")
		}
		else
		{
			req.session.user = user
			console.log(user)
			res.redirect('/kunde/intern')
		}
	})
})


// RENDER INTERN
router.get('/intern', Auth, function(req, res){

	// Ermittelt, ob der Kunde bereits einen Schaden gemeldet hat
	Kunde.getSchaden(req.session.user.kennung, function(err, schaden){
		console.log("Schaden-Lenght: " +schaden.length)
		if(schaden.length > 0)
		{
			res.render("uebersicht", {schadenArray : schaden})
		}
		else
		{
			res.render("erfassen")
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
	"sonstiges"  : req.body.sonstiges,
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
			res.render("error")
		}
		else
		{
<<<<<<< HEAD
			console.log(schaden)
			res.redirect('/kunde/intern')
=======
			res.render("controlcenter", schaden)
>>>>>>> master
		}
	})
})

module.exports = router