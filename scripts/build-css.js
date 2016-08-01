var path = require('path')
var ackSass = require('ack-sass')
var filePath = path.join(__dirname,'../','src','test-scss')
var outFilePath = path.join(__dirname,'../','www')
 
var sassJspm = require('sass-jspm-importer')
var options={
  importer:[sassJspm.importer],
  functions:[sassJspm.resolve_function('/lib/')]//for sass-jspm-importer
}
 
console.log('compiling sass')
 
ackSass.compilePath(filePath, outFilePath, options)
.then(function(){
  console.log('compiling completed')
})
.catch(function(err){
  console.log('err', err)
})