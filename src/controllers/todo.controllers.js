const catchError = require('../utils/catchError');
const Todo = require('../models/Todo');

const getAll = catchError(async(req, res) => {
    const { id } = req.user
    const results = await Todo.findAll({where: {userId: id}});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { id } = req.user
    const result = await Todo.create({task: req.body.task, userId: id});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Todo.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const todo = await Todo.findByPk(id)
    if (!todo.userId === userId) {
        return res.sendStatus(401)
    }
    await Todo.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { id: userId } = req.user;
    const todo = await Todo.findByPk(id)
    if (!todo.userId === userId) {
        return res.sendStatus(401)
    }
    const result = await Todo.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}