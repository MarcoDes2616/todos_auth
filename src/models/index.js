const Todo = require("./Todo");
const User = require("./User");


User.hasMany(Todo)
Todo.belongsTo(User)