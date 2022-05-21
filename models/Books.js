const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  name: String,
  genre: String
});

const Books = mongoose.model("Book", BookSchema);
module.exports = Books;
