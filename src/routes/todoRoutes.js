const express = require('express')
const { Todo } = require('../models/Todo')
const todoRouter = express.Router()

todoRouter.get('/', async (req, res, next) => {
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (error) {
        next(error)
    }
})
todoRouter.get('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (todo) {
            res.json(todo)
        }
        throw new Error('TODO_NOT_FOUND')

    } catch (error) {
        next(error)
    }
})
todoRouter.post('/', async (req, res, next) => {
    try {
        if (!req.body.title) throw new Error('TODO_TITLE_MISSING')
        const todo = await Todo({ title: req.body.title }).save()
        res.json(todo)
    } catch (error) {
        next(error)
    }
})
todoRouter.delete('/:id', async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id)
        if (todo) {
            await todo.delete()
            res.json(todo)
        }
        throw new Error('TODO_NOT_FOUND')

    } catch (error) {
        next(error)
    }
})

module.exports = todoRouter