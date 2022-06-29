const express = require('express')

const app = express()
const port = process.env.port || 3000

const loginRouter = require('./routes/login');
const booksRouter = require('./routes/books');

app.use(express.json())

app.use('/api/user', loginRouter)
app.use('/api/books', booksRouter)


app.listen(port)