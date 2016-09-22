import s3 from "./jspm"
import angular from "angular"
import ackAngular from "ack-angular"

import testFormTemplate from "./templates/test-form.pug"

class TestForm{
  constructor(S3,$scope){
    this.S3 = S3
    this.$scope = $scope
    this.mode = 'getObject'
    this.aws = {region:"us-east-1"}
    this.s3 = {
      Body:"Hello S3 World!",
      KmsParams:{
        KeySpec:"AES_256"
      }
    }

    this.reloadConfig()
  }

  applyAwsAccess(){
    this.S3.AWS.config.update({
      accessKeyId: this.aws.accessKeyId
      ,secretAccessKey: this.aws.secretAccessKey
    });

    this.S3.AWS.config.region = 'us-east-1'
  }

  getObject(){
    this.fetching = true
    this.applyAwsAccess()
    
    var s3 = Object.assign({}, this.s3)
    delete s3.Body
    delete s3.KmsParams

    this.S3.getObject(s3, (err,data)=>{
      if(err)return console.log(err)

      this.fetching = false
      this.resultOfGet = data.Body
      this.$scope.$apply()
    })
  }

  putObject(){
    this.applyAwsAccess()

    var s3 = Object.assign({}, this.s3)
    
    this.S3.putObject(s3, (err,data)=>{
      if(err)return console.log(err)

      this.fetching = false
      alert('PUT success!!!!')
      this.$scope.$apply()
    })
  }

  getConfig(){
    return {aws:this.aws, s3:this.s3, mode:this.mode}
  }

  saveConfig(){
    localStorage.setItem('ack-aws-s3-universal', JSON.stringify(this.getConfig()))
    alert('config saved to browser localStorage')
  }

  reloadConfig(){
    var config = localStorage.getItem('ack-aws-s3-universal')
    if(!config)return
    
    config = JSON.parse(config)
    
    this.aws = config.aws
    this.s3 = config.s3
    this.mode = config.mode
  }

  clearConfig(){
   localStorage.removeItem('ack-aws-s3-universal')
  }

}
TestForm.$inject = ['S3', '$scope']

export default angular.module('test-app',[ackAngular])
.service('S3', ()=>s3)
.component('testForm', {
  template:testFormTemplate,
  transclude:true,
  controller:TestForm
})
.name