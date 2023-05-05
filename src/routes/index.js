const express = require('express');
const userRouter = require('./user.router');
const todoRouter = require('./todo.router');
const router = express.Router();

// colocar las rutas aquí
router.use("/users", userRouter)

router.use("/todos", todoRouter)

module.exports = router;