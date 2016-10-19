var expect = require('chai').expect
var request = require('request')
var fs = require('fs')
var FormData = require('form-data')

describe('xml上传测试', function() {
  it('请求的响应,应该为6', function(done) {
    var xmlBody = `<?xml version='1.0' encoding='utf-8'?>
<a>7</a>`
    request.post({
      url:"http://localhost:3000/xml",
      headers:{
        'Content-Type':'text/xml'
      },
      body:xmlBody
    },function(e,r,b){
      var info = JSON.parse(b)
      expect(info.a).to.be.equal("7")
      done()
    })
  });
});

describe('文件上传测试', function() {
  it('请求的响应,', function(done) {
    var form = new FormData()
    // var buffer = new Buffer(['123'])
    form.append('my_field', 'my value');
    // form.append("id",1)
    // form.append("file",buffer)
    var formData = {
      id:1,
      file:new Buffer([1]),
      file2:fs.createReadStream(__dirname + '/text')
    }
    request.post({
      url:"http://localhost:3000/upload",
      headers:{
        'Content-Type':'multipar/form-data'
      },
      formData:formData
    },function(e,r,b){
      console.log("-->",b)
      // var info = JSON.parse(b)
      done()
    })
  });
});
