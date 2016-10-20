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
      var info = JSON.parse(b)
      expect(info.id).to.be.equal('1')
      done()
    })
  });
});

describe('中间件测试',function(){
  it('请求的响应为,success',function(done){
    request.get('http://localhost:3000/test',function(e,r,b){
      if(e){
        done(e)
      }else{
        expect(b).to.be.equal('success')
        done()
      }
    })
  })
})

describe('multipart测试,',function(){
  it('请求的响应为,success',function(done){
    request.post({
      url:'http://localhost:3000/multipart',
      preambleCRLF: true,
      postambleCRLF: true,
      multipart:[
        {
          'content-type': 'application/json',
          body: JSON.stringify({foo: 'bar', _attachments: {'message.txt': {follows: true, length: 18, 'content_type': 'text/plain' }}})
        },
        { body: 'I am an attachment' }
      ]
    },function(e,r,b){
      if(e){
        done(e)
      }else{
        expect(b).to.be.equal('success_multipart')
        done()
      }
    })
  })
})
