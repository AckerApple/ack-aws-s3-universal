var AWS = require("aws-sdk")
var crypto = require('crypto')

module.exports = require('./src/s3-encryption-client.js')(AWS, crypto, Buffer)