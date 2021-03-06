/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


/* hard-coded data! */
var sampleAlbums = [];
sampleAlbums.push({
             artistName: 'Ladyhawke',
             name: 'Ladyhawke',
             releaseDate: '2008, November 18',
             genres: [ 'new wave', 'indie rock', 'synth pop' ]
           });
sampleAlbums.push({
             artistName: 'The Knife',
             name: 'Silent Shout',
             releaseDate: '2006, February 17',
             genres: [ 'synth pop', 'electronica', 'experimental' ]
           });
sampleAlbums.push({
             artistName: 'Juno Reactor',
             name: 'Shango',
             releaseDate: '2000, October 9',
             genres: [ 'electronic', 'goa trance', 'tribal house' ]
           });
sampleAlbums.push({
             artistName: 'Philip Wesley',
             name: 'Dark Night of the Soul',
             releaseDate: '2008, September 12',
             genres: [ 'piano' ]
           });
/* end of hard-coded data */




$(document).ready(function() {
  console.log('app.js loaded!');

// sampleAlbums.forEach(function(album){ 
//    renderAlbum(album);
// });

  $.ajax({
    type:"GET",
    url:"/api/albums",
    data:[],
    success:function(data){
        data.forEach(function(album){ 
        renderAlbum(album);
    });
    }
  });

$('#albumForm').on('submit',function(e){
  e.preventDefault();
  console.log($('#albumForm').serialize());
  $.ajax({
    type:"POST",
    url:"/api/albums",
    data:$('#albumForm').serialize(),
    success:function(data){
      console.log("server siad: ",data);
      renderAlbum(data);
    }
  })
});



$('#albums').on('click', '.add-song', function(e) {
    console.log('asdfasdfasdf');
    var id= $(this).parents('.album').data('album-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',id);
    $('#songModal').data('album-id', id);
    $('#songModal').modal();

   $('#saveSong').on('click',handleNewSongSubmit);
});
});


function handleNewSongSubmit(e){
  e.preventDefault();
  var id = $('#songModal').data('album-id');
  var newSongUrl ="http://localhost:3000/api/albums/"+id+"/songs";


$.ajax({
  method:"POST",
  url:newSongUrl,
  data:{name:$('#songName').val(),trackNumber:$('#trackNumber').val()},
  success:function(data){
   console.log(data);
  }
});
}



// this function takes a single album and renders it to the page
function renderAlbum(album) {
  //console.log('rendering album:', album);
  //var count = 1;

  var albumHtml =
  "        <!-- one album -->" +
  "        <div class='row album' data-album-id='" + album._id + "'>" +
  "          <div class='col-md-10 col-md-offset-1'>" +
  "            <div class='panel panel-default'>" +
  "              <div class='panel-body'>" +
  "              <!-- begin album internal row -->" +
  "                <div class='row'>" +
  "                  <div class='col-md-3 col-xs-12 thumbnail album-art'>" +
  "                     <img src='" + "http://placehold.it/400x400'" +  " alt='album image'>" +
  "                  </div>" +
  "                  <div class='col-md-9 col-xs-12'>" +
  "                    <ul class='list-group'>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Album Name:</h4>" +
  "                        <span class='album-name'>" + album.name + "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Artist Name:</h4>" +
  "                        <span class='artist-name'>" + album.artistName+ "</span>" +
  "                      </li>" +
  "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Released date:</h4>" +
  "                        <span class='album-releaseDate'>" + album.releaseDate + "</span>" +
  "                      </li>" +
   "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Genres:</h4>" +
  "                        <span class='album-genres'>" + album.genres + "</span>" +
  "                      </li>" +
   "                      <li class='list-group-item'>" +
  "                        <h4 class='inline-header'>Songs:</h4>" +
  "                        <span class='album-songs'>" + buildSongHTML(album.songs) + "</span>" +
  "                      </li>" +

  "                    </ul>" +
  "                  </div>" +
  "                </div>" +
  "                <!-- end of album internal row -->" +

  "              </div>" + // end of panel-body

  "              <div class='panel-footer'>" +
 "                     <button class='btn btn-primary add-song'>Add Song</button>"+
  "              </div>" +

  "            </div>" +
  "          </div>" +
  "          <!-- end one album -->";

  // render to the page with jQuery
  $('#album-list').append(albumHtml);
 // count++;

}


function buildSongHTML(songs){
  var songString = "";
  songs.forEach(function(song){
    songString+= "- ("+song.trackNumber+") "+song.name+" ";

  });
  return songString;
}

