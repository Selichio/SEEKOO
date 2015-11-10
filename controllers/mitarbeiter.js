var express = require('express')
  , router = express.Router()
  , Mitarbeiter = require('../models/mitarbeiter')
  , Auth = require('../middlewares/auth')



// Routen für http://localhost:3000/mitarbeiter/*


// RENDER LOGIN
router.get('/login', function(req, res) {
  res.render('login')
})
// PROCESS LOGIN
router.post('/login', function(req, res) {
	console.log("GET.Login")
	Mitarbeiter.processLogin(req.body.benutzername, req.body.passwort,function(err, user) {
		if(err)
		{
			res.render("error", {message : err})
		}
		else
		{
			req.session.user = user
			res.redirect('/mitarbeiter/intern')
		}
	})
})


// RENDER INTERN
router.get('/intern', Auth, function(req, res){

	Mitarbeiter.getAlleSchaeden(function(err, schaeden){
		console.log("Anzahl Schäden: " + schaeden.length)
		if(schaeden.length > 0)
		{
			res.render("controlcenter", {schadenArray : schaeden})
		}
		else
		{
			res.render("controlcenter", {message : "Keine Vorfälle vorhanden"})
		}

	})
})


// RENDER SCHADENDETAIL
router.get('/schaden/:schadenid', function(req,res){
	Mitarbeiter.getSchadenById(req.params.schadenid, function(err, schaden){
		console.log("Schaden (1=true): " + schaden.length)
		if(schaden.length > 0)
		{
			res.send(schaden)
		}
		else
		{
			res.send("Zu dieser ID wurde kein Schaden gefunden")
		}
	})
})




module.exports = router