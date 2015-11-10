module.exports = function(req, res, next) {
	// Routen für http://localhost:3000/1users/*
  res.locals.user = req.session.user;
  next();
}