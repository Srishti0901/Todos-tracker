const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
