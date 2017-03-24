var express = require('express'),
  app = express(),
  fs = require('fs'),
  jsonfile = require('jsonfile'),
  path = require('path');

fs.readFile('test.json', function(err, data){
  if (err) throw err
  var inFile = JSON.parse(data)
})

console.log(require(path.resolve('test.json')))

console.log(jsonfile.readFileSync('test.json'))

app.post('/id', function(req, res){

})

var server = app.listen(3000, function(){
  console.log('Server running at http://localhost:%s', server.address().port)
})