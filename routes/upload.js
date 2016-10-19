var express = require('express');
var router = express.Router();

router.post('/upload',function(req,res){
  console.log("hahaha")
  res.send(req.file)
})

module.exports = router;
