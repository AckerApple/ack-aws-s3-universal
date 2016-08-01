var ackPug = require("ack-pug-bundler")
var path = require("path")
var folderPath = path.join(__dirname,"../","src","pugs")
var outPath = path.join(__dirname,"../","src","templates")
 
console.log('[ack-pug-bundler]:building', folderPath)
 
//pug files written with ecma6 export syntax
ackPug.crawlPath(folderPath, outPath)
.then(function(){
  console.log('[ack-pug-bundler]:ecma6 completed', folderPath)
})
