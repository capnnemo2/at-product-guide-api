require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const productsRouter = require("./products/products-router");
const commentsRouter = require("./comments/comments-router");

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "at-product-guide",
  api_key: "236767549636484",
  api_secret: "K2JlvkVrr7H5e531m1XMOV1oC3Y",
});

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test",
  })
);
app.use(helmet());
app.use(cors());

app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");

  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: { message: `Unauthorized request` } });
  }
  next();
});

app.use("/api/products", productsRouter);
app.use("/api/comments", commentsRouter);

app.get("/", (req, res) => {
  res
    .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
    .send("Hello, world");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "production") {
    response = { error: { message: "server error" } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
