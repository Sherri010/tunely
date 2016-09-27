/************
 * DATABASE *
 ************/

var db = require('../models');



// GET /api/albums
function index(req, res) {
  db.Album.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  });
}

function create(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });
}

function show(req, res) {
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    if(err) { console.log('albumsController.show error', err); }
    console.log('albumsController.show responding with', foundAlbum);
    res.json(foundAlbum);
  });
}

function destroy(req, res) {
   db.Album.findOneAndRemove({_id : req.params.id},function(err,removed){

      if(err){console.log(err);}
      res.json(removed);
   });
  
}

function update(req, res) {
  var id = req.params.id;

  db.Album.findOne({_id:id},function(err,found){
    if(err) throw err;

    found.name = req.body.name || found.name;
    found.artistName = req.body.name || found.artistName;
    found.releaseDate = req.body.releaseDate || found.releaseDate;
    found.genres = req.body.genres.split(',').map(function(item) { return item.trim(); } ) || found.genres;

    found.save();
    res.json(found);

 
  });


}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
