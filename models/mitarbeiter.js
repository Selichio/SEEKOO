// Export some model methods
var mongo = require('mongodb')
, monk = require('monk')
, pwhash = require('password-hash')
, db = monk('localhost:27017/schadenserfassung')
 

exports.processLogin = function(user, pass, cb) {
	console.log("Model Mitarbeiter: processLogin")
	var err = null
	var collUser = db.get("User")
	console.log("User:" + user + " PW: " + pass)

	collUser.findOne({"kennung" : user}, function(err, userDB){
		if(userDB == null)
		{
			err = "User existiert nicht"
			console.log(err)
			cb(err, null)
		}
		else
		{
			if(pwhash.verify(pass, userDB.password))
			{
				console.log("TRUE")
				cb(err, userDB)
			}
			else
			{
				err = "Falsches Passwort - Bitte prüfen"
				console.log(err)
				cb(err, null)
			}
		}
	})
};

exports.getAlleSchaeden = function(cb){
	console.log("Model Mitarbeiter: getAlleSchaeden")
	var err = null
	var collSchaden = db.get("Schaden")
	collSchaden.find({}, function(err, schaeden){
		cb(err, schaeden)
	})
};

exports.getSchadenById = function(schadenid, cb){
	console.log("Model Mitarbeiter: getSchadenById")
	var err = null
	var returnschaden = null
	var collSchaden = db.get("Schaden")
	collSchaden.findById(schadenid,{}, function(err, schaden){
		cb(err,schaden)
	})
};


exports.updateStatus = function(id, cb){
	console.log("Model Mitarbeiter: updateStatus")
	var err = null
	var collSchaden = db.get("Schaden")
	collSchaden.updateById(id, {$set : {
		"status" : "work in progress"
	}}, function(err){
		cb(err)
	})
}

exports.editSchaden = function(schaden, cb){
	console.log("Model Mitarbeiter: editSchaden")
	var err = null
	var collSchaden = db.get("Schaden")
	collSchaden.updateById(schaden.schadenid,{$set : {
		"fahrzeugbewertung" : schaden.fahrzeugbewertung,
		"kostenvoranschlag" : schaden.kostenvoranschlag,
		"status" : schaden.status,
		"rechnung" : schaden.rechnung
		}
	}, 
	function(err, docs){
		cb(err, docs)
	})
};








