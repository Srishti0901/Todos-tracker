require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const TodosRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/todos", TodosRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(
    "mongodb+srv://Workout:Workout123@cluster0.h6vo9xp.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    }
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
