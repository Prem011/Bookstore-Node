const mongoose = require("mongoose");
const SqlString = require("mysql/lib/protocol/SqlString");

const bookModel = new mongoose.Schema({
    name : String,
    author : String,
    price : Number,
    quantity : Number,
    language : String,
    category : String,
    description : string,
        
});

const Book = mongoose.model("book", bookModel);

module.exports = Book;