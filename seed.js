// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require("./models");

var albumsList =[{
         
              artistName: 'the Old Kanye',
              name: 'The College Dropout',
              releaseDate: '2004, February 10',
              genres: [ 'rap', 'hip hop' ],
              songs:[]
            },
            {
            
              artistName: 'the New Kanye',
              name: 'The Life of Pablo',
              releaseDate: '2016, Febraury 14',
              genres: [ 'hip hop' ],
              songs:[]
            },
{
              artistName: 'the always rude Kanye',
              name: 'My Beautiful Dark Twisted Fantasy',
              releaseDate: '2010, November 22',
              genres: [ 'rap', 'hip hop' ],
              songs:[]
            },
{
              artistName: 'the sweet Kanye',
              name: '808s & Heartbreak',
              releaseDate: '2008, November 24',
              genres: [ 'r&b', 'electropop', 'synthpop' ],
              songs:[]
            }
  // put data here!
];




var sampleSongs = [

{ name: 'Famous',trackNumber: 1
},
{ name: "All of the Lights", trackNumber: 2
},
{ name: 'Guilt Trip', trackNumber: 3
},
{ name: 'Paranoid',trackNumber: 4
},
{ name: 'Ultralight Beam', trackNumber: 5
},
{ name: 'Runaway', trackNumber: 6
},
{ name: 'Stronger',trackNumber: 7
}];







sampleSongs.forEach(function(song){
  
    var newSong = new db.Song(song);
    newSong.save();
    albumsList.forEach(function(album){
    	album.songs.push(newSong);

	});
});


db.Album.remove({}, function(err, albums){

  db.Album.create(albumsList, function(err, albums){
    if (err) { return console.log('ERROR', err); }
    console.log("all albums:", albums);
    console.log("created", albums.length, "albums");
    process.exit();
  });

});

