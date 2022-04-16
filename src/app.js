// Regular imports
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const todoRouter = require('./routes/todoRoutes')

// Instantiating 
const app = express()
const logger = morgan('short')


// using middlewares
app.use(logger)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())



// using routes
app.use('/api/todo',todoRouter)


// Not a good error handler
app.use((err, req, res, next) => {


    if (err.message === 'TODO_TITLE_MISSING') {

        res.statusCode = 422
        res.json({ message: err.message })

    } else if (err.message === 'TODO_NOT_FOUND') {

        res.statusCode = 404
        res.json({ message: err.message })

    }
    else {
        res.statusCode = err.status || err.statusCode || 500
        res.json(err._message || err.message)
    }

    next()
})
module.exports = app
