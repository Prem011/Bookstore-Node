const { log } = require('console');
var express = require('express');
var router = express.Router();

const Books = require("../models/bookschema");
const fs = require("fs");
const path = require("path");

const upload = require("../utils/multer").single("image");

// const BOOKS = [
//   {
//     name : "book1",
//     author : "author1",
//     price : 20,
//     quantity : 3,
//     language : "hindi",
//     category : "novel",
//     description: "This is a good book"
//   },
// ];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  // 
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', upload, async function(req, res, next) {
  
  // BOOKS.push(req.body); // add the new book to?
  // res.redirect("/readall");
  
  //asynchronus codde
  // books.create(req.body).then((books)=>{
  //   res.redirect("/readall");
  // }).catch((err)=>{console.log(err);})
  
  // sync code , industrial ready code 

  try{
    // res.json({body : req.body , file : req.file} );
    const newBook = new Books({...req.body, image : req.file.filename});
    await newBook.save();
    res.redirect("/readall");
  }
  catch(err){
    res.send(err);
  }

});

router.get('/readall', async function(req, res) {
  // console.log(BOOKS)
  // res.render('library', {books : BOOKS});

  // books.find()
  //   .then((books)=>{
  //     res.render("library", {books : books})
  //   })
  //   .catch((err)=> res.send(err));

  try{
    const books = await Books.find()
      res.render("library", {books : books});
  }
  catch(error){
    res.send(error);
  }

});

// router.get('/delete/:index', function(req, res, next) {
router.get('/delete/:id', async function(req, res, next) {
  // BOOKS.splice(req.params.index,1);
  // res.redirect('/readall')
  try{
    // await Books.findByIdAndDelete(req.params.id);
    //dlt new after multer for pic
    const Book =  await Books.findByIdAndDelete(req.params.id);
    //for deleting the img
    fs.unlinkSync(
      path.join(__dirname,'..', 'public', 'images', 'uploads', Book.image )
    );

    res.redirect("/readall");
  }
  catch(error){
    res.send(error)
  }
});

router.get('/update/:id', async function(req, res, next) {
  // BOOKS.push(req.body); // add the new book to
  // const i = req.params.index;
  // const b = BOOKS[i];
  // res.render('update', {book : b, index : i} );

  try{
    const book = await Books.findById(req.params.id);
    res.render( "update" , { book: book });
  }
  catch(err){
    console.log(err);
  }

});


// router.post('/update/:id', async function(req, res, next) {
  // for updating the img from uploaing img
  // const i = req.params.index;
  // BOOKS[i] = req.body;
  // res.redirect("/readall");

  // try{
  //   await Books.findByIdAndUpdate(req.params.id, req.body);
  //   res.redirect("/readall");
  // }
  // catch(err){
    //   console.log(err);
    // }
    
  router.post('/update/:id',upload, async function(req, res, next) {
  try{
    const updatedData = {...req.body};
    if(req.file){
      updatedData.image = req.file.filename;
      fs.unlinkSync(
        path.join(__dirname,'..', 'public', 'images', 'uploads', req.body.oldImage)
      );
    }
    await Books.findByIdAndUpdate(req.params.id, updatedData);
    res.redirect("/readall");
  }
  catch(err){
    console.log(err);
  }

}); 



router.get('/about', function(req, res, next) {
  res.render('about');
});




module.exports = router;
