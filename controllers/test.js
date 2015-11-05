var express = require('express')
  , router = express.Router()
  , Mitarbeiter = require('../models/mitarbeiter')
  , Auth = require('../middlewares/auth')
, mongo = require('mongodb')
, monk = require('monk')
, db = monk('localhost:27017/schadenserfassung')

// Routen für http://localhost:3000/mitarbeiter/*

router.get('/insert', function(req, res) {
var db = req.db
var collection = db.get('Mitarbeiter')
collection.findOne({"kennung" : "lb85783"},{}, function(e, usr){
console.log(usr)
req.session.user = usr
console.log("Hallo")
res.send(usr)
var colSchaden = db.get('Schaden')
colSchaden.insert({
	"vorfallnr" : 112,
	"Auto"      : "BMW M3",
	"Melder"    : req.session.user
}, function(err){
	console.log(err)
})
})
})

router.get('/einzelschaden', function(req,res){
	var collection = db.get("Schaden")
	collection.find({"Melder.kennung" : "lb85783"}, function(err, usr){
		console.log(usr)
		res.send(usr)
	})
})


/*
MONGODB -Kommandos

Update
db.Collection.update({"suchkey" : "suchvalue"}, {$set : {"modkey" : "modval"}})




*/


router.get('/schaden', function(req,res){
	var collection = db.get("Schaden")
	collection.find({}, function(err, usr){
		for (var i = usr.length - 1; i >= 0; i--) {
			console.log("Auto: " + usr[i].Auto +"\n" 
				+ "Halter: " + usr[i].Melder.name)
		//	console.log("Session-User (Vorname): "+ req.session.user.vorname)
		}
		res.send("ENDE")
	})
})




router.get('/cc', function(req, res) {
  res.render('controlcenter')
})

router.get('/erfassen', function(req, res) {
  res.render('erfassen')
})



module.exports = router