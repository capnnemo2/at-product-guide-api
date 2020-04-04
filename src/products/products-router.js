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

productsRouter
  .route("/:product_id")
  .all(checkProductExists)
  .get((req, res) => {
    res.json(ProductsService.serializeProduct(res.product));
  });

productsRouter
  .route("/:product_id/comments")
  .all(checkProductExists)
  .get((req, res, next) => {
    ProductsService.getCommentsForProduct(
      req.app.get("db"),
      req.params.product_id
    )
      .then(comments => {
        res.json(ProductsService.serializeProductComments(comments));
      })
      .catch(next);
  });

async function checkProductExists(req, res, next) {
  try {
    const product = await ProductsService.getById(
      req.app.get("db"),
      req.params.product_id
    );

    if (!product)
      return res.status(404).json({ error: `Product doesn't exist` });

    res.product = product;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = productsRouter;
