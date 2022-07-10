const express = require('express')
const path = require('path');

const loginRouter = require('./routes/login');
const booksRouter = require('./routes/books');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.use('/api/user', loginRouter)
app.use('/api/books', booksRouter)

const port = process.env.port || 3000
app.listen(port)