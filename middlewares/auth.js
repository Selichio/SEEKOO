module.exports = function(req, res, next) {
	console.log(req.baseUrl)
	//var regex = new RegExp(req.session.user.rolle, 'gi');
  if (req.session.user && req.baseUrl.indexOf(req.session.user.rolle)> -1) {
  	console.log("Rolle gefunden: " + req.session.user.rolle)
    next()
  } else {
  	console.log("User (err): ")
    res.status(404)
      	res.send("ERROR 404: Bitte zuerst anmelden")

  }
}