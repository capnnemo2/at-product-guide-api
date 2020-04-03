const xss = require("xss");

const ProductsService = {
  getAllProducts(db) {
    return db.from("products").select("*");
  },

  // getAllProducts(db) {
  //   return db
  //     .from("products")
  //     .select(
  //       "*",
  //       // db.raw(`json_build_array(mesh, hard_three_eighths, hard_one_quarter)`),
  //       db.raw(
  //         `array_to_json(array_agg(json_build_array(mesh, hard_three_eighths, hard_one_quarter, soft_three_eighths, prep_bend, prep_weld, weld)))`
  //       )
  //     )
  //     .groupBy("id");
  // },

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

  //   serializeProduct(product) {
  //     return {
  //       id: product.id,
  //       product_code: xss(product.product_code),
  //       product_name: xss(product.product_name),
  //       product_type: xss(product.product_type),
  //       mesh: xss(product.mesh),
  //       hard_three_eighths: xss(product.hard_three_eighths),
  //       hard_one_quarter: xss(product.hard_one_quarter),
  //       soft_three_eighths: xss(product.soft_three_eighths),
  //       prep_bend: xss(product.prep_bend),
  //       prep_weld: xss(product.prep_weld),
  //       weld: xss(product.weld)
  //     };
  //   }
  // };

  serializeProduct(product) {
    console.log(product.mesh ? product.mesh : []);
    return {
      id: product.id,
      product_code: xss(product.product_code),
      product_name: xss(product.product_name),
      product_type: xss(product.product_type),
      mesh: product.mesh ? product.mesh.map(m => xss(m)) : [],
      hard_three_eighths: product.hard_three_eighths
        ? product.hard_three_eighths.map(hte => xss(hte))
        : [],
      hard_one_quarter: product.hard_one_quarter
        ? product.hard_one_quarter.map(hoq => xss(hoq))
        : [],
      soft_three_eighths: product.soft_three_eighths
        ? product.soft_three_eighths.map(ste => xss(ste))
        : [],
      prep_bend: product.prep_bend ? product.prep_bend.map(pb => xss(pb)) : [],
      prep_weld: product.prep_weld ? product.prep_weld.map(pw => xss(pw)) : [],
      weld: product.weld ? product.weld.map(w => xss(w)) : []
    };
  }
};

module.exports = ProductsService;
