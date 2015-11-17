// Export some model methods
var mongo = require('mongodb')
, monk = require('monk')
, pwhash = require('password-hash')
, db = monk('localhost:27017/schadenserfassung')
  
exports.processLogin = function(user, pass, cb) {
	console.log("Model Kunde: processLogin")
	var err = null
	var returnuser = null
	var collUser = db.get("User")
	console.log("User:" + user + " PW: " + pass)

	collUser.findOne({"kennung" : user}, function(err, userDB){
		if(pwhash.verify(pass, userDB.password))
		{
			console.log("TRUE")
			cb(err, userDB)
		}
		else
		{
			err = "Falsches Password"
			console.log(err)
			cb(err, null)
		}

	})
};

exports.getSchaden = function(userid, cb) {
	console.log("Model Kunde: getSchaden")
	console.log("Userid: " + userid)
	var err = null
	var collSchaden = db.get("Schaden")
	collSchaden.find({ "Melder.kennung" : userid}, function(err, schaden){
		cb(err, schaden)

	})
};

exports.addSchaden = function(schaden, cb) {
	console.log("Model Kunde: addSchaden")
	var err = null
	var collSchaden = db.get("Schaden")
	collSchaden.insert(schaden, function(err){
		cb(err)
	})	
};

exports.getSchadenById = function(schadenid, cb){
	console.log("Model Kunde: getSchadenById")
	var err = null
	var returnschaden = null
	var collSchaden = db.get("Schaden")
	collSchaden.find({}, function(err, schaden){
		for (var i = schaden.length - 1; i >= 0; i--) {
			if(schaden[i]._id == schadenid)
			{
				returnschaden = schaden[i]
			}
		};
		cb(err,returnschaden)
	})
};
