const express = require("express");
const ProductsService = require("./products-service");

const productsRouter = express.Router();

productsRouter.route("/").get((req, res, next) => {
  ProductsService.getAllProducts(req.app.get("db"))
    .then(products => {
      res.json(products.map(ProductsService.serializeProduct));
    })
    .catch(next);
});
