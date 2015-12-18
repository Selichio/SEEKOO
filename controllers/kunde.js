var express = require('express')
  , router = express.Router()
  , Kunde = require('../models/kunde')
  , Auth = require('../middlewares/auth')

  

// RENDER LOGIN
router.get('/login', function(req, res) {
  res.render('login')
})
// PROCESS LOGIN
router.post('/login', function(req, res) {
	console.log("GET.Login")
	Kunde.processLogin(req.body.benutzername, req.body.passwort,function(err, user) {
		if(user == null)
		{
			res.render("error", {message : err})
		}
		else
		{
			req.session.user = user
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

router.post('/erfassen',Auth, function(req, res){
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
			res.render("error", {message : err})
		}
		else
		{
			console.log(schaden)
			res.redirect('/kunde/intern')
		}
	})
})


// RENDER SCHADENDETAIL
router.get('/schaden/:schadenid',Auth, function(req,res){
	Kunde.getSchadenById(req.params.schadenid, function(err, schaden){
		if(schaden)
		{
			res.render("schaden", {schaden : schaden})
			//res.send(schaden)
		}
		else
		{
			res.send("Zu dieser ID wurde kein Schaden gefunden")
		}
	})
})

module.exports = router