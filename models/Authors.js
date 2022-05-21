const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
  name: String,
  Age: Number
});

const Authors = mongoose.model("Author", AuthorSchema);
module.exports = Authors;
