let nodeS3MainPath = require.resolve('node-s3-encryption-client/lib/main')
let nodeS3CryptPath = require.resolve('node-s3-encryption-client/lib/crypt')
let fs = require('fs')
let writePath = require('path').join(__dirname, '../', 'src', 's3-encryption-client.js')

let mainContents = fs.readFileSync(nodeS3MainPath).toString()
let cryptContents = fs.readFileSync(nodeS3CryptPath).toString()

cryptContents = cryptContents.replace(/^[^;]+;/,'')//remove opening requires
cryptContents = cryptContents.replace(/exports/g,'crypt')//remove opening requires
cryptContents = cryptContents.replace(/(\r|\n)/g,'$1  ')//tab-out

mainContents = mainContents.replace(/^[^;]+;/,'')//remove opening requires
mainContents = mainContents.replace(/^[^;]+;/,'')//remove bad variable declaration
mainContents = mainContents.replace(/(\r|\n)/g,'$1  ')//tab-out
mainContents = mainContents.replace(/kms\./g,'new AWS.KMS().')//delay when constructed
mainContents = mainContents.replace(/s3\./g,'new AWS.S3().')//delay when constructed

const newString = `//DO NOT EDIT, overwritten in build:s3 process

module.exports = function(AWS, crypto, Buffer){
  var exports = {AWS:AWS, crypto:crypto, Buffer:Buffer},
      crypt = {},
      metadataCipherAlgorithm = 'cipher-algorithm',
      metadataDecryptedEncoding = 'decrypted-encoding',
      metadataKmsKeyName = 'x-amz-key';

${cryptContents}

${mainContents}

  return exports
}
`

fs.writeFileSync(writePath, newString)