//rewritten from node-s3-encryption-client via ../scripts/rewrite-node-s3-encryption-client.js
module.exports = function(AWS, crypto, Buffer){
  var exports = {AWS:AWS, crypto:crypto, Buffer:Buffer},
      crypt = {},
      metadataCipherAlgorithm = 'cipher-algorithm',
      metadataDecryptedEncoding = 'decrypted-encoding',
      metadataKmsKeyName = 'x-amz-key';


  
  /*
    options:
      algorithm: Anything from crypto.getCiphers()
      decryptedEncoding: 'utf8', 'ascii', or 'binary'
      outputEncoding: 'binary', 'base64', or 'hex'
   */
  crypt.Helper = function(password, options) {
    this.password = password;
    options = options || {};
    this.algorithm = options.algorithm || 'aes-256-cbc';
    this.decryptedEncoding = options.decryptedEncoding || 'utf8';
    this.encryptedEncoding = options.encryptedEncoding || 'base64';
  }
  
  crypt.Helper.prototype.encrypt = function(unencrypted) {
    var cipher = crypto.createCipher(this.algorithm, this.password);
    return cipher.update(unencrypted, this.decryptedEncoding, this.encryptedEncoding) + cipher.final(this.encryptedEncoding);
  }
   
  crypt.Helper.prototype.decrypt = function(encrypted) {
    var decipher = crypto.createDecipher(this.algorithm, this.password);
    return decipher.update(encrypted, this.encryptedEncoding, this.decryptedEncoding) + decipher.final(this.decryptedEncoding);
  }


  
  exports.getObject = function(params, callback) {
    var encryptionContext = params.EncryptionContext;
    delete params.EncryptionContext;
    new AWS.S3().getObject(params, function(err, objectData) {
      if (err) {
        callback(err, null);
      } else {
        var metadata = objectData.Metadata || {};
        var kmsKeyBase64 = metadata[metadataKmsKeyName];
        if (kmsKeyBase64) {
          var kmsKeyBuffer = new Buffer(kmsKeyBase64, 'base64');
          new AWS.KMS().decrypt({CiphertextBlob: kmsKeyBuffer, EncryptionContext: encryptionContext}, function(err, kmsData) {
            if (err) {
              callback(err, null);
            } else {
              var helper = new crypt.Helper(kmsData.Plaintext.toString('base64'), {algorithm: metadata[metadataCipherAlgorithm], decryptedEncoding: metadata[metadataDecryptedEncoding]});
              objectData.Body = helper.decrypt(objectData.Body.toString('utf-8'));
              delete objectData.Metadata[metadataKmsKeyName];
              delete objectData.Metadata[metadataCipherAlgorithm];
              delete objectData.Metadata[metadataDecryptedEncoding];
              callback(null, objectData);
            }
          });
        } else {
          callback(null, objectData);
        }
      }
    });
  }
  
  exports.putObject = function(params, callback) {
    var kmsParams = params.KmsParams
    if (kmsParams && kmsParams.KeyId) {
      new AWS.KMS().generateDataKey(kmsParams, function(err, kmsData) {
        if (err) {
          callback(err, null);
        } else {
          var helper = new crypt.Helper(kmsData.Plaintext.toString('base64'), {algorithm: params.CipherAlgorithm, decryptedEncoding: params.DecryptedEncoding});
          params.Body = helper.encrypt(params.Body);
          params.Metadata = params.Metadata || {};
          params.Metadata[metadataKmsKeyName] = kmsData.CiphertextBlob.toString('base64');
          if (params.CipherAlgorithm) params.Metadata[metadataCipherAlgorithm] = params.CipherAlgorithm;
          if (params.DecryptedEncoding) params.Metadata[metadataDecryptedEncoding] = params.DecryptedEncoding;
          putObject(params, callback);
        }
      })
    } else {
      putObject(params, callback);
    }
  }
  
  function putObject(params, callback) {
    delete params.KmsParams;
    delete params.CipherAlgorithm;
    delete params.DecryptedEncoding;
    new AWS.S3().putObject(params, callback);
  }

  return exports
}
