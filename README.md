# ack-aws-s3-universal
Library to perform AWS S3 in a universal manner between both NodeJs and Web Browsers with focus on with optional KmsParams

A wrapper for aws-sdk, aws-sdk-js, node-s3-encryption-client, and crypto

[DEMO PAGE](https://ackerapple.github.io/ack-aws-s3-universal/)

> GOAL: To provide one package that facilitates both the web and node-server enviroment.

### Table of Contents
- [Installation](#installation)
    - [Short-Hand Installation](#short-hand-installation)
    - [Detailed Installation](#detailed-installation)
        - [Global Install Dependencies](#global-install-dependencies)
        - [GIT Checkout](#git-checkout)
        - [Node Package Manager Install](#node-package-manager-install)
        - [Javascript Package Manager Install](#javascript-package-manager-install)
    - [Launch Browser Test](#launch-browser-test)
    - [Build for Deployment](#build-for-deployment)
- [Examples](#examples)
    - [Node Example](#node-example)
    - [Browser Example](#browser-example)
- [Documentation](#documentation)

## Installation
### Short-Hand Installation
If you've done this before or just want an installation overview, read the following.

Create a project folder called "ack-aws-s3-universal" and then begin to run commands against it.

> In a command terminal, type the following, one command after another:

```
npm install pug-cli jspm@beta ionic-serve -g

git clone "https://github.com/ackerapple/ack-aws-s3-universal.git"

npm install

jspm install
```

> After running the above, if you encounter any error related to invalid access. Please read the [GIT Checkout](#git-checkout) portion of this guide.


### Detailed Installation
Requires NodeJs to be pre-installed. All install commands are run in a command line terminal.

#### Global Install Dependencies
Some functionality that is depended on, must be installed at the Operating System level.

> In a command terminal, type the following:

```
npm install pug-cli jspm@beta ionic-serve -g
```

#### GIT Checkout
> In a command terminal, type the following:

```
git clone "https://github.com/ackerapple/ack-aws-s3-universal.git"
```

>> Now, private repositories will to be checked out.
>> Authenticated access maybe required.
>> You can set your jspm private repo access to be the same as your github

> In a command terminal, type the following, only if you want github to act as your jspm credentials:

```
jspm registry config github
```


#### Node Package Manager Install
> In a command terminal, type the following:

```
npm install
```

#### Javascript Package Manager Install
> In a command terminal, type the following:

```
jspm install
```

### Launch Browser Test
> In a command terminal, type the following:

```
npm test
```

### Build for Deployment
> In a command terminal, type the following:

```
npm run build
```

## Examples

### Node Example
> Example coming soon

### Browser Example

> The following example is available for testing, by opening the file [./dist/index.html](https://github.com/AckerApple/ack-aws-s3-universal/blob/master/dist/index.html)

```
<script src="ack-aws-s3-universal.js" type="text/javascript"></script>
<script>
  //ACCESS CONFIG
  ackS3.AWS.config.update({
    accessKeyId: ""
    ,secretAccessKey: ""
  })
  ackS3.AWS.config.region = 'us-east-1'

  var bucket = ""
  var filename = ""

  //GET CONFIG
  var getData = {
    Bucket:bucket,
    Body:"Hello S3 World!",
    Key:filename
  }

  //PUT CONFIG
  var putData = {
    Bucket:bucket,
    Body:"Hello S3 World!",
    Key:filename,
    KmsParams:{
      KeyId:"",
      KeySpec:"AES_256"
    }
  }

  function getObject(){
    ackS3.getObject(getData, (err,data)=>{
      if(err)return console.log(err)

      alert('GET success!!!!')
      console.log('GET.BODY', data.Body)
    })
  }

  function putObject(){
    ackS3.putObject(putData, (err,data)=>{
      if(err)return console.error(err)
      alert('PUT success!!!!')
    })
  }

  getObject()
  putObject()
</script>
```