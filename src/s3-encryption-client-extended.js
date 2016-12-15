var s3 = require('./s3-encryption-client')

module.exports = function(AWS, crypto, Buffer){
  var rtn = s3(AWS, crypto, Buffer)

  rtn.put = rtn.putObject
  rtn.get = rtn.getObject
  
  rtn.promise = function(params){
    return new Promise(function(res,rej){
      rtn.getObject(params,function(err,data){
        if(err)return rej(err)
        res(data)
      })
    })
  }

  rtn.promisePut = function(params){
    return new Promise(function(res,rej){
      rtn.putObject(params,function(err,data){
        if(err)return rej(err)
        res(data)
      })
    })
  }

  return rtn
}