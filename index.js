const express = require('express')
const { v4: uuidv4 } = require('uuid');
const app = express()
const port = process.env.port || 3000

class Book {
  constructor(title = "", description = "", authors = "", favorite = "", fileCover = "", fileName= "", id = String(uuidv4())) {
    this.id = id
    this.title = title
    this.description = description
    this.authors = authors
    this.favorite = favorite
    this.fileCover = fileCover
    this.fileName = fileName
  }
}

const store = {
  books: []
}

app.use(express.json())

app.post('/api/user/login', (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru"})
})

app.get('/api/books', (req, res) => {
  res.json(store.books)
})
app.get('/api/books/:id', (req, res) => {
  const item = store.books.find(el => el.id === req.params.id)

  if (item) {
    res.json(item)
  } else {
    res.status(404)
    res.json('not found')
  }
})

app.post('/api/books', (req, res) => {
  const {title, description, authors, favorite, fileCover, fileName} = req.body

  const newBook = new Book(title, description, authors, favorite, fileCover, fileName)
  store.books.push(newBook)

  res.status(200).json(newBook)
})


app.put('/api/books/:id', (req, res) => {
  
  const item = store.books.find(el => el.id === req.params.id)
  if (item) {
    const {title, description, authors, favorite, fileCover, fileName} = req.body
    // item = {
    //   ...item,
    //   title, 
    //   description, 
    //   authors, 
    //   favorite, 
    //   fileCover, 
    //   fileName
    // }
    //выше приведенный код не работает ответа пока не нашел

    item.title = title  
    item.description = description 
    item.authors = authors 
    item.favorite = favorite
    item.fileCover = fileCover 
    item.fileName = fileName
    res.json(item);
  } else {
    res.status(404)
    res.json('not found')
  }
});

app.delete('/api/books/:id', (req, res) => {
  const item = store.books.find(el => el.id === req.params.id)

  if (item) {
    store.books = store.books.filter(el => el.id !== req.params.id)
    res.json('ok')
  } else {
    res.status(404)
    res.json('not found')
  }
  
})

app.listen(port)