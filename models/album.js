var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var songSchema = require('./song.js').songSchema;

var albumSchema = new Schema({
	artistName: String,
	name: String,
	releaseDate: String,
	genres: [String],
	songs: [songSchema]

});

console.log("Error hit?")

var Album = mongoose.model("Album",albumSchema);

module.exports = Album;