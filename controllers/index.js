var express = require('express')
  , router = express.Router()


router.use('/kunde', require('./kunde'))
router.use('/mitarbeiter', require('./mitarbeiter'))
router.use('/test', require('./test'))


router.get('/logout', function(req,res){
	req.session.destroy(function(err){
		res.render('index')
	})
})
router.get('/', function(req, res) {
  res.render('index')
})

module.exports = router