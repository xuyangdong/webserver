var parseString = require('xml2js').parseString;

function xmlBodyParser(req,res,next){
  if(req.get('content-type')!='text/xml')  {next(); return}
  let tem = parseString(req.body,function(err,result){
    if(err){
      next(err)
      return
    }else{
      console.log(result)
      req.body = result
      next()
      return
    }
  })
}

module.exports = xmlBodyParser
