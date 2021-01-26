const mongoose = require("mongoose");

const ArchiveSchema = mongoose.Schema({
  requestId: String,
  type: String,
  title: String,
  thumb: String,
  imdb_id: String,
  tmdb_id: String,
  tvdb_id: String,
  users: Array,
  sonarrId: Array,
  radarrId: Array,
  approved: Boolean,
  removed: Boolean,
  removed_reason: String,
  complete: Boolean,
});

module.exports = mongoose.model("Archive", ArchiveSchema);
