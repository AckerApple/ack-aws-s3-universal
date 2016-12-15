const assert = require('assert')
const ackS3 = require('../index')

const config = {
  accessKeyId: ""//fill
  ,secretAccessKey: ""//fill
}
const bucket = ""//fill
const filename = ""//fill

//ACCESS CONFIG
ackS3.AWS.config.update(config)
ackS3.AWS.config.region = 'us-east-1'

const getData = {
  Bucket:bucket,
  Key:filename
}

const putData = {
  Bucket:bucket,
  Body:"Hello S3 World!",
  Key:filename,
  KmsParams:{
    KeyId:"",
    KeySpec:"AES_256"
  }
}

describe('custom-test',()=>{
  beforeEach('config-test',()=>{
    assert.notEqual(config.accessKeyId, "", "You have not configured AWS accessKeyId")
    assert.notEqual(config.secretAccessKey, "You have not configured AWS secretAccessKey")
    assert.notEqual(bucket, "You have not specified a bucket")
    assert.notEqual(filename, "You have not specified a file-folder-name")
  })

  it('#put',done=>{
    ackS3.promisePut(putData)
    .then(data=>{
      assert.equal(typeof data, 'object')
      assert.equal(data.constructor, Object)
    })
    .then(done).catch(done)
  })

  it('#promise',done=>{
    ackS3.promise(getData)
    .then(data=>{
      assert.equal(typeof data, 'object')
      assert.equal(data.constructor, Object)
      assert.equal(data.Body.constructor, Buffer)
    })
    .then(done).catch(done)
  })
})