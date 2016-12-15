# ack-aws-s3-universal
Library to perform AWS S3 in a universal manner between both NodeJs and Web Browsers with focus on with optional KmsParams

A wrapper for aws-sdk, aws-sdk-js, node-s3-encryption-client, and crypto

[DEMO PAGE](https://ackerapple.github.io/ack-aws-s3-universal/)

> GOAL: To provide one package that facilitates both the web and node-server enviroment.

### Table of Contents
- [Installation](#installation)
  - [Launch Browser Test](#launch-browser-test)
  - [Build for Deployment](#build-for-deployment)
- [S3 Browser CORS Warning](#s3-browser-cors-warning)
- [Examples](#examples)
  - [Node Examples](#node-example)
    - [GET Example](#nodejs-get-example)
    - [PUT Example](#nodejs-put-example)
  - [Browser Examples](#browser-example)
    - [GET Example](#get-example)
    - [PUT Example](#put-example)

## Installation
```
npm install ack-aws-s3-universal --save
```

## S3 Browser CORS Warning
To GET, PUT, or POST to an S3 bucket from a web browser, Cross Origin Requests must be configured properly.

Enable CORS on your S3 bucket

- Login to AWS
- Goto S3 bucket
- Goto Properties
- Goto Permissions
- Goto CORS Configuration

Use the following universal configuration to allow CORS on your S3 bucket

```
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
    <CORSRule>
        <AllowedOrigin>*</AllowedOrigin>
        <AllowedMethod>GET</AllowedMethod>
        <AllowedMethod>PUT</AllowedMethod>
        <AllowedMethod>POST</AllowedMethod>
        <AllowedMethod>DELETE</AllowedMethod>
        <MaxAgeSeconds>3000</MaxAgeSeconds>
        <ExposeHeader>x-amz-server-side-encryption</ExposeHeader>
        <ExposeHeader>x-amz-request-id</ExposeHeader>
        <ExposeHeader>x-amz-id-2</ExposeHeader>
        <ExposeHeader>x-amz-meta-x-amz-key</ExposeHeader>
        <AllowedHeader>*</AllowedHeader>
    </CORSRule>
</CORSConfiguration>
```

## Examples

### Node Examples

### NodeJs GET Example
```
const ackS3 = require('ack-aws-s3-universal')

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

ackS3.promise(getData)
.then(data=>{
  console.log(data.Body)
})
.catch(e=>console.error(e))
```

### NodeJs PUT Example
Use config variables seen in [NodeJs GET Example](#nodejs-get-example) to continue with this example
```
const putData = {
  Bucket:bucket,
  Body:"Hello S3 World!",
  Key:filename,
  KmsParams:{//optional fill for encryption
    KeyId:"",//fill
    KeySpec:"AES_256"
  }
}

ackS3.promisePut(putData)
.then(data=>{
  console.log('put success!')
})
.catch(e=>console.error(e))
```

### Browser Examples

> If you are bundling (webpack/jspm) this code
```
import ackS3 from "ack-aws-s3-universal"
```

> If you need a script tag:
```
<script src="ack-aws-s3-universal.js" type="text/javascript"></script>
```

The following examples are also available for testing here: [./dist/index.html](https://github.com/AckerApple/ack-aws-s3-universal/blob/master/dist/index.html)

### GET Example
```
<script>
  //The variable "ackS3" must already be available

  //ACCESS CONFIG
  ackS3.AWS.config.update({
    accessKeyId: ""//fill
    ,secretAccessKey: ""//fill
  })
  ackS3.AWS.config.region = 'us-east-1'

  var bucket = ""//fill
  var filename = ""//fill

  //GET CONFIG
  var getData = {
    Bucket:bucket,
    Key:filename
  }

  function getObject(){
    ackS3.get(getData, (err,data)=>{
      if(err)return console.log(err)

      alert('GET success!!!!')
      console.log('GET.BODY', data.Body)
    })
  }


  getObject()
</script>
```

### PUT Example
Use config variables seen in [GET Example](#get-example) to continue with this example
```
<script>
  //The variable "ackS3" must already be available
  //ackS3 adn ACCESS CONFIG must already be configured. See GET Example

  //PUT CONFIG
  var putData = {
    Bucket:bucket,//configred in GET example
    Body:"Hello S3 World!",
    Key:filename,//configred in GET example
    KmsParams:{//optional fill
      KeyId:"",//fill
      KeySpec:"AES_256"
    }
  }

  function putObject(){
    ackS3.put(putData, (err,data)=>{
      if(err)return console.error(err)
      alert('PUT success!!!!')
    })
  }
  
  putObject()
```