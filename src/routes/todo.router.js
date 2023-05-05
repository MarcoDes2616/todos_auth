const { getAll, create, getOne, remove, update } = require('../controllers/todo.controllers');
const express = require('express');
const verifyJWT = require('../middleware/auth.middleware');

const todoRouter = express.Router();

todoRouter.route('/')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

todoRouter.route('/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = todoRouter;