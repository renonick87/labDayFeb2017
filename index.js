var express = require('express'),
  app = express(),
  fs = require('fs'),
  locations = {}

fs.readFile('index.json', {encoding: 'utf8'}, function(err, data){
  if (err) throw err
  locations = JSON.parse(data)
  //JSON.parse(data).forEach(function(place){
  //  locations.push(place)
  //})
})

app.get('/', function(req, res){
  var main = '<a href="/' + 'main' + '">' + 'List of Hunting Places in Michigan' + '</a><br>'
  res.send(main)
})

app.get('/main', function(req, res){
  let buffer = 'Search By County<br><br>'
  Object.keys(locations).forEach(function(location){
    buffer += '<a href="/main/' + location + '">' + location + '</a><br>'
  })
  buffer += '<br><form action="/main/edit/"><button class="btn" type="submit">Add New County to List</button></form>'
  res.send(buffer)
})

app.get('/main/edit', function(req, res){
  let buffer = 'Edit<br><br>',
    inp = '<form>Enter County Name: <input type="text" name="game"> (optional) image URL: <input type="text" name="image"><input type="submit"></form>'
})

app.get('/main/:location', function(req, res){
  let buffer = 'Search By Type<br><br>'
  Object.keys(locations[req.params.location]).forEach(function(game){
    buffer += '<a href="/main/' + req.params.location + '/' + game + '">' + game + '</a><br>'
  })
  res.send(buffer)
})

app.get('/main/:location/:game', function(req, res){
  let buffer = 'List of ' + req.params.game + ' in ' + req.params.location + '<br><br>'
  Object.keys(locations[req.params.location][req.params.game]).forEach(function(game){
    /*if(!!locations[req.params.location][req.params.game].image)*/ buffer += '<img src="' + locations[req.params.location][req.params.game][game].image + '" height=100 width=100/>'
    buffer += game + '<br>'
  })
  buffer += '<form action="/main/' + req.params.location + '/' + req.params.game + '/edit/"><button class="btn" type="submit" >Add New Game To Location</button></form>'
  buffer += '<form action="/main/' + req.params.location + '/' + req.params.game + '/delete/"><button class="btn" type="submit" >Delete Game From Location</button></form>'
  res.send(buffer)
})

app.get('/main/:location/:game/delete', function(req, res){
  let buffer = 'List of ' + req.params.game + ' in ' + req.params.location + '<br><br>',
    i = 0
  var checks = []
  Object.keys(locations[req.params.location][req.params.game]).forEach(function(game){
    //checks[i] = false
    //buffer += '<input type="checkbox" name="' + i + '" checked=true onclick="' +
    //del(i) + '" onmousedown="' + del(i) + '"/>'
    /*if(!!locations[req.params.location][req.params.game].image)*/ buffer += '<img src="' + locations[req.params.location][req.params.game][game].image + '" height=100 width=100/>'
    buffer += game
    buffer += '<form action="/delete"><button class="btn" type="button" name="' + i +'" onmouseup="' + del(i) + '">Delete</button></form>'
    i++
  })
  //buffer += '<form action="/main/' + req.params.location + '/' + req.params.game + '/delete"><button class="btn" type="button" onclick="console.log(\'wooh\')">Delete Game From Location</button></form>'
  res.send(buffer)
})

app.get('/main/:location/:game/edit', function(req, res){
  let buffer = 'Edit<br><br>',
    inp = '<form>Enter Game Name: <input type="text" name="game"> (optional) image URL: <input type="text" name="image"><input type="submit"></form>'
  if(req.query.game && req.query.image) {
    edit(locations, req)
    res.redirect('/main/' + req.params.location + '/' + req.params.game + '/')
  }
  buffer += inp
  res.send(buffer)
})

app.get('/delete', function(req, res){
  del(1)
  res.redirect('/')
})

var server = app.listen(1204, function(){
  console.log('Server running at http://localhost:%s', server.address().port)
})

function edit(locations, req){
  game = req.query.game
  image = req.query.image
  console.log('got to here')
  locations[req.params.location][req.params.game][game] = {}
  locations[req.params.location][req.params.game][game].image = image
  fs.writeFile('index.json', JSON.stringify(locations), function(err, data){
    if(err) console.log(err)
    else console.log('successful edit of index.json')
  })
}

function del(i){
  console.log('wooh', i)
  //delete locations[Object.keys(locations)[i]]
}
