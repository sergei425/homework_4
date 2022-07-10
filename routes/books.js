const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const multer = require('../middleware/file')

class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName= "", fileBook = "" , id = String(uuidv4())) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
    this.fileBook = fileBook
  }
}

const store = {
  books: []
}

router.get('/', (req, res) => {
  res.render("index", {
    title: "Index",
    books: store.books,
  });
})

router.get('/create', (req, res) => {
  res.render("create", {
    title: "Create"
  });
})

router.post('/create', (req, res) => {
  multer.single('book.txt')
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  store.books.push(newBook)

  res.status(200).json(newBook)
})

router.get('/update/:id', (req, res) => {
  console.log(req.params.id);
  const item = store.books.find(el => el.id === req.params.id)
  res.render("update", {
    title: "Update",
    item
  });
})

router.post('/update/:id', (req, res) => {
  const item = store.books.find(el => el.id === req.params.id)
  if (item) {
    const {title, description, authors, favorite, fileCover, fileName, fileBook} = req.body

    item.title = title  
    item.description = description 
    item.authors = authors 
    item.favorite = favorite
    item.fileCover = fileCover 
    item.fileName = fileName
    item.fileBook = fileBook
    res.json(item);
  } else {
    res.status(404).json('not found')
  }
});

router.get('/:id', (req, res) => {
  const item = store.books.find(el => el.id === req.params.id)

  if (!item) {
    
    //res.redirect('/api/books')
  } 

  res.render('book', {
    title: "View",
    item
  });
})

router.get('/:id/download', (req, res) => {
  const item = store.books.find(el => el.id === req.params.id)

  if (item) {
    res.download(path.join(__dirname, item.fileName), (err)=>{
      console.log(err);
    });
    console.log('Your file has been downloaded!')
  } else {
    res.status(404).json('not found')
  }
})

router.delete('/:id', (req, res) => {
  const item = store.books.find(el => el.id === req.params.id)

  if (item) {
    store.books = store.books.filter(el => el.id !== req.params.id)
    res.json('ok')
  } else {
    res.status(404).json('not found')
  }
  
})

module.exports = router;
