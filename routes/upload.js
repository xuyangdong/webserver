var express = require('express');
var router = express.Router();

router.post('/upload',function(req,res){
  console.log("hahaha")
  res.set({
    'Access-Control-Allow-Origin':'*'
  })
  res.send(req.file)
})

module.exports = router;
