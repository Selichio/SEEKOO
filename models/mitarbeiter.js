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

