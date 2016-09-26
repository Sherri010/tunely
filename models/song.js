
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var songSchema = new Schema({
	name: String,
	trackNumber: Number
});

var Song = mongoose.model("Song",songSchema);

module.exports.songSchema = songSchema;
module.exports.Song = Song;


