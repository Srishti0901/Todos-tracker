const Todo = require("../models/TodoModel");
const mongoose = require("mongoose");

const getTodos = async (req, res) => {
  const user_id = req.user._id;
  const userId = user_id.toString();
  const todosList = await Todo.aggregate([
    { $match: { user_id: userId } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$category",
        todos: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0,
        todos: 1,
      },
    },
  ]);
  res.status(200).json(todosList);
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo task exist" });
  }
  const todo = await Todo.findById(id);
  if (!todo) {
    return res.status(404).json({ error: "No such Todo task exist" });
  }

  res.status(200).json(todo);
};

const createTodo = async (req, res) => {
  const { title, Description, category } = req.body;
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!Description) {
    emptyFields.push("Description");
  }
  if (!category) {
    emptyFields.push("category");
  }

  if (emptyFields.length > 0) {
    console.log(emptyFields);
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const Category = category.toLowerCase();
    const todo = await Todo.create({
      title,
      Description,
      category: Category,
      user_id,
    });
    console.log(todo);
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo task exist" });
  }

  const todo = await Todo.findOneAndDelete({ _id: id });
  if (!todo) {
    return res.status(404).json({ error: "No such Todo task exist" });
  }

  res.status(200).json(todo);
};

const UpdateTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Todo task exist" });
  }

  const todo = await Todo.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!todo) {
    return res.status(404).json({ error: "No such Todo task exist" });
  }
  res.status(200).json(todo);
};

module.exports = {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  UpdateTodo,
};
