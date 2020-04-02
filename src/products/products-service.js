const xss = require("xss");

const ProductsService = {
  getAllProducts(db) {
    return db.from("products").select("*");
  },

  getById(db, id) {
    return ProductsService.getAllProducts(db)
      .where("id", id)
      .first();
  },

  getCommentsForProduct(db, product_id) {
    return db
      .from("comments AS comm")
      .SELECT("comm.id", "comm.user_name", "comm.content")
      .where("comm.product_id", product_id);
  },

  insertProduct(db, newProduct) {
    return db
      .insert(newProduct)
      .into("products")
      .returning("*")
      .then(([product]) => product)
      .then(product => ProductsService.getById(db, product.id));
  },

  deleteProduct(db, id) {
    return db.where({ id }).delete();
  },

  updateProduct(db, id, newProductFields) {
    return db.where({ id }).update(newProductFields);
  },

  serializeProduct(product) {
    return {
      id: product.id,
      product_code: xss(product.product_code),
      product_name: xss(product.product_name),
      product_type: xss(product.product_type),
      mesh: xss(product.mesh),
      hard_three_eighths: xss(product.hard_three_eighths),
      hard_one_quarter: xss(product.hard_one_quarter),
      soft_three_eighths: xss(product.soft_three_eighths),
      prep_bend: xss(product.prep_bend),
      prep_weld: xss(product.prep_weld),
      weld: xss(product.weld)
    };
  }
};

module.exports = ProductsService;
