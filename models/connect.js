
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/bookstoredb")
  .then(function () {
    console.log('Connected to MongoDB');
  })
  .catch(function (err) {
    console.error('Error connecting to MongoDB: ', err);
  });
  
// var db = mongoose.connection;
// db.on("error", function(error){
//   console.log("MongoDB error: ", error);
// });