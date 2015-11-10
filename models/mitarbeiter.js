// Export some model methods
var mongo = require('mongodb')
, ObjectId=require('mongodb').ObjectID
, monk = require('monk')
, pwhash = require('password-hash')
, db = monk('localhost:27017/schadenserfassung')
 

exports.processLogin = function(user, pass, cb) {
	console.log("Model Mitarbeiter: processLogin")
	var err = null
	var collUser = db.get("User")
	console.log("User:" + user + " PW: " + pass)

	collUser.findOne({"kennung" : user}, function(err, userDB){
		console.log("UserDB: " + userDB.password)
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
	var obid = ObjectId(schadenid)
	console.log("OBID!!!!!!!!! : "+ obid)
	var collSchaden = db.get("Schaden")
	collSchaden.findOne({_id : ObjectId(schadenid)}, function(err, schaden){
		cb(err,schaden)
	})
};

