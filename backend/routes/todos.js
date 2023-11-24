const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  createTodo,
  getTodo,
  getTodos,
  deleteTodo,
  UpdateTodo,
} = require("../controllers/todosController");
const router = express.Router();

router.use(requireAuth);

router.get("/", getTodos);

router.get("/:id", getTodo);

router.post("/", createTodo);

router.delete("/:id", deleteTodo);

router.patch("/:id", UpdateTodo);

module.exports = router;
