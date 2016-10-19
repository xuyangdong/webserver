var express = require('express');
var router = express.Router();

router.post('/upload',function(req,res){
  res.send(req.file)
})

module.exports = router;
