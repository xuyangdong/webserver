var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("test endpoint")
  res.send('success');
});

module.exports = router;
