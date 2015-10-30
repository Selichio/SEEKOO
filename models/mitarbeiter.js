// Export some model methods
var mongo = require('mongodb')
, monk = require('monk')
, db = monk('localhost:27017/schadenserfassung')
 

exports.processLogin = function(user, pass, cb) {
	var err = null
	console.log("Model Mitarbeiter: processLogin")
	var returnuser
	if( user == "Alex" && pass == "geheim")
	{
	  cb(err, {vorname: user, rolle : "mitarbeiter"});

	}
	else
	{
		err = "User Informationen stimmen nicht überein"
		cb(err, null);

	}
};

