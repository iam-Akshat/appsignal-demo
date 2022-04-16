const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 50,
        min: 1
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('todos', todoSchema)

module.exports = { Todo }