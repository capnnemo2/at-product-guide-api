const express = require("express");
const ProductsService = require("./products-service");
const path = require("path");

const productsRouter = express.Router();
const jsonParser = express.json();

productsRouter
  .route("/")
  .get((req, res, next) => {
    ProductsService.getAllProducts(req.app.get("db"))
      .then(products => {
        res.json(products.map(ProductsService.serializeProduct));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const {
      product_code,
      product_name,
      product_type,
      mesh,
      hard_three_eighths,
      hard_one_quarter,
      soft_three_eighths,
      prep_bend,
      prep_weld,
      weld
    } = req.body;
    const newProduct = { product_code, product_name, product_type };

    for (const [key, value] of Object.entries(newProduct)) {
      if (value == null) {
        return res
          .status(400)
          .json({ error: { message: `Missing '${key}' in request body` } });
      }
    }

    newProduct.mesh = mesh;
    newProduct.hard_three_eighths = hard_three_eighths;
    newProduct.hard_one_quarter = hard_one_quarter;
    newProduct.soft_three_eighths = soft_three_eighths;
    newProduct.prep_bend = prep_bend;
    newProduct.prep_weld = prep_weld;
    newProduct.weld = weld;

    ProductsService.insertProduct(req.app.get("db"), newProduct)
      .then(product => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${product.id}`))
          .json(ProductsService.serializeProduct(product));
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
