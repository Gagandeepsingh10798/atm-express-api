var express = require('express');
var router = express.Router();
var controller = require('../controllers/atm');

router.get('/', function(req, res, next) {
  res.send({"message":"Welcome to My API"});
});

router.post('/', function(req, res, next) {
  controller.processing(req,res);
});

module.exports = router;
