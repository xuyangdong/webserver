var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/',function(req,res){

  res.send({
    header:{
      'content-type':req.get("content-type")
    },
    body:{
      body:req.body,
      name:req.param('name'),
      name:req.body.name
    }
  })
})

module.exports = router;
