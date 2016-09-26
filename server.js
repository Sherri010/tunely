// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
// generate a new express app and call it 'app'
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));
/************
 * DATABASE *
 ************/
var db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index (req, res){
  res.json({
    message: "Welcome to tunely!",
    documentation_url: "https://github.com/tgaff/tunely/api.md",
    base_url: "http://tunely.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
});

app.get('/api/albums', function album_index(req, res){
     console.log('hitting api/albums');
     db.Album.find({},function(err,list){
      if(err){console.log(err)}
        res.json(list);
     })
    //res.json(albums)
});

app.post('/api/albums',function(req,res){
  
  var newalbum = new db.Album({
   artistName: req.body.artistName,
  name: req.body.albumName,
  releaseDate: req.body.releaseDate,
  genres: [req.body.genres]
  });

  console.log(newalbum);

   newalbum.save(function(err,saved){
    if(err){console.log(err)}
      res.json(saved);
   })
})

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
