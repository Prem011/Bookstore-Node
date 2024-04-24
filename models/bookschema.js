const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    image : String,
    name : String,
    author : String,
    price : Number,
    quantity : Number,
    language : String,
    category : String,
    description : String,
        
});

const Book = mongoose.model("book", bookModel);

module.exports = Book;