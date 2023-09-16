require("dotenv").config();
const path = require("path");

const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const logger = require("morgan");
const cors = require("cors");
const authRouter = require("./routes/api/auth");
const userProducts= require("./routes/api/products")
const userWeight= require("./routes/api/weight")
const userRouter = require("./routes/api/users");

const app = express();
app.use("/avatars", express.static(path.join(__dirname, "public", "avatars")));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/api/users", authRouter);
app.use("/api/users", userRouter);
app.use("/api/user", userProducts);
app.use("/api/user", userWeight);

app.use((req, res) => {
  res.status(404).json({ message: "Not found my page!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;

// Hello World !!!
// POST /api/user/food-intake