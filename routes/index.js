const { log } = require('console');
var express = require('express');
var router = express.Router();
const BOOKS = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/create', function(req, res, next) {
  res.render('create');
});

router.post('/create', function(req, res, next) {
  BOOKS.push(req.body); // add the new book to
  res.redirect("/readall");
});

router.get('/readall', function(req, res, next) {
  console.log(BOOKS)
  res.render('library', {books : BOOKS});
});

router.get('/delete/:index', function(req, res, next) {
  BOOKS.splice(req.params.index,1);
  res.redirect('/readall')
});

router.get('/update/:index', function(req, res, next) {
  BOOKS.push(req.body); // add the new book to
  const i = req.params.index;
  const b = BOOKS[i];
  res.render('update', {book : b, index : i} );

});


router.post('/update/:index', function(req, res, next) {
  const i = req.params.index;
  BOOKS[i] = req.body;
  res.redirect("/readall");

}); 



router.get('/about', function(req, res, next) {
  res.render('about');
});




module.exports = router;
