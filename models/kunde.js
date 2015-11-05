// Export some model methods
var mongo = require('mongodb')
, monk = require('monk')
, db = monk('localhost:27017/schadenserfassung')
  
exports.processLogin = function(user, pass, cb) {
	console.log("Model Kunde: processLogin")
	var err = null
	var returnuser
	if( user == "Dennis" && pass == "geheim")
	{
	  cb(err, {vorname: user, rolle : "kunde"});

	}
	else
	{
		err = "User Informationen stimmen nicht überein"
		cb(err, null);

	}
};

exports.getSchaden = function(userid, cb) {
	console.log("Model Kunde: getSchaden")
	var err = null
	var collUser = db.get("Schaden")
	collUser.find({ "Melder" : { "kennung" : "lb85783"}}, function(err, schaden){
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
