const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const { TEST_DATABASE_URL } = require("../src/config");

describe("products endpoints", function () {
  let db;

  const { testProducts, testComments } = helpers.makeFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /api/products`, () => {
    context(`Given no products`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/products")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, []);
      });
    });

    context(`Given there are products in the database`, () => {
      beforeEach("insert products", () =>
        helpers.seedProducts(db, testProducts)
      );

      it(`responds with 200 and all of the products`, () => {
        const expectedProducts = testProducts.map((product) =>
          helpers.makeExpectedProduct(product)
        );
        return supertest(app)
          .get("/api/products")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedProducts);
      });
    });

    context(`Given as XSS attack product`, () => {
      const {
        maliciousProduct,
        expectedProduct,
      } = helpers.makeMaliciousProduct();

      beforeEach("insert malicious product", () => {
        return helpers.seedMaliciousProduct(db, maliciousProduct);
      });

      it(`removes XSS attack content`, () => {
        return supertest(app)
          .get("/api/products")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect((res) => {
            expect(res.body[0].product_code).to.eql(
              expectedProduct.product_code
            );
            expect(res.body[0].product_name).to.eql(
              expectedProduct.product_name
            );
            expect(res.body[0].product_type).to.eql(
              expectedProduct.product_type
            );
            expect(res.body[0].mesh).to.eql(expectedProduct.mesh);
            expect(res.body[0].hard_three_eighths).to.eql(
              expectedProduct.hard_three_eighths
            );
            expect(res.body[0].hard_one_quarter).to.eql(
              expectedProduct.hard_one_quarter
            );
            expect(res.body[0].soft_three_eighths).to.eql(
              expectedProduct.soft_three_eighths
            );
            expect(res.body[0].prep_bend).to.eql(expectedProduct.prep_bend);
            expect(res.body[0].prep_weld).to.eql(expectedProduct.prep_weld);
            expect(res.body[0].weld).to.eql(expectedProduct.weld);
          });
      });
    });
  });

  describe(`GET /api/products/:product_id`, () => {
    context(`Given no products`, () => {
      // beforeEach(() => helpers.seedProducts(db, testProducts));

      it(`responds with 404`, () => {
        const productId = 1234567;
        return supertest(app)
          .get(`/api/products/${productId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Product doesn't exist` } });
      });
    });

    context(`Given there are products in the database`, () => {
      beforeEach("insert products", () =>
        helpers.seedProducts(db, testProducts)
      );

      it(`responds with 200 and the specified product`, () => {
        const productId = 2;
        const expectedProduct = helpers.makeExpectedProduct(
          testProducts[productId - 1]
        );

        return supertest(app)
          .get(`/api/products/${productId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedProduct);
      });
    });

    context(`Given an XSS attack product`, () => {
      const testProduct = helpers.makeProductsArray()[1];
      const {
        maliciousProduct,
        expectedProduct,
      } = helpers.makeMaliciousProduct(testProduct);

      beforeEach("insert malicious product", () => {
        return helpers.seedMaliciousProduct(db, maliciousProduct);
      });

      it(`removes XSS attack content`, () => {
        return supertest(app)
          .get(`/api/products/${maliciousProduct.id}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.product_code).to.eql(expectedProduct.product_code);
            expect(res.body.product_name).to.eql(expectedProduct.product_name);
            expect(res.body.product_type).to.eql(expectedProduct.product_type);
            expect(res.body.mesh).to.eql(expectedProduct.mesh);
            expect(res.body.hard_three_eighths).to.eql(
              expectedProduct.hard_three_eighths
            );
            expect(res.body.hard_one_quarter).to.eql(
              expectedProduct.hard_one_quarter
            );
            expect(res.body.soft_three_eighths).to.eql(
              expectedProduct.soft_three_eighths
            );
            expect(res.body.prep_bend).to.eql(expectedProduct.prep_bend);
            expect(res.body.prep_weld).to.eql(expectedProduct.prep_weld);
            expect(res.body.weld).to.eql(expectedProduct.weld);
          });
      });
    });
  });

  describe(`GET /api/products/:product_id/comments`, () => {
    context(`Given no products`, () => {
      beforeEach(() => helpers.seedProducts(db, testProducts));

      it(`responds with 404`, () => {
        const productId = 1234567;
        return supertest(app)
          .get(`/api/products/${productId}/comments`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Product doesn't exist` } });
      });
    });

    // context(`Given no comments for this product`, () => {

    // })

    context(`Given there are comments for this product`, () => {
      beforeEach("insert products", () =>
        helpers.seedProductsAndComments(db, testProducts, testComments)
      );

      it(`responds with 200 and the specified comments`, () => {
        const productId = 1;
        const expectedComments = helpers.makeExpectedProductComments(
          productId,
          testComments
        );

        return supertest(app)
          .get(`/api/products/${productId}/comments`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect(expectedComments);
      });
    });
  });

  describe(`POST /api/products`, () => {
    const requiredFields = ["product_code", "product_name", "product_type"];
    requiredFields.forEach((field) => {
      const newProduct = {
        product_code: "Test product code",
        product_name: "Test product name",
        product_type: "Test product type",
      };
      it(`responds with 400 and an error when the ${field} is missing`, () => {
        delete newProduct[field];
        return supertest(app)
          .post("/api/products")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send(newProduct)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });

    it(`creates a product, responding with 201 and the new product`, () => {
      const newProduct = {
        product_code: "Test product code",
        product_name: "Test product name",
        product_type: "Test product type",
        mesh: ["test mesh 1", "test mesh 2"],
        hard_three_eighths: ['test hard 3/8"'],
        hard_one_quarter: ['test hard 1/4"'],
        soft_three_eighths: ['test soft 3/8"'],
        prep_bend: ["test prep bend"],
        prep_weld: ["test prep weld"],
        weld: ["test weld"],
      };
      return supertest(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .send(newProduct)
        .expect(201)
        .expect((res) => {
          expect(res.body.product_code).to.eql(newProduct.product_code);
          expect(res.body.product_name).to.eql(newProduct.product_name);
          expect(res.body.product_type).to.eql(newProduct.product_type);
          expect(res.body.mesh).to.eql(newProduct.mesh);
          expect(res.body.hard_three_eighths).to.eql(
            newProduct.hard_three_eighths
          );
          expect(res.body.hard_one_quarter).to.eql(newProduct.hard_one_quarter);
          expect(res.body.soft_three_eighths).to.eql(
            newProduct.soft_three_eighths
          );
          expect(res.body.prep_bend).to.eql(newProduct.prep_bend);
          expect(res.body.prep_weld).to.eql(newProduct.prep_weld);
          expect(res.body.weld).to.eql(newProduct.weld);
        })
        .then((postRes) =>
          supertest(app)
            .get(`/api/products/${postRes.body.id}`)
            .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(postRes.body)
        );
    });

    it(`removes XSS attack content from response`, () => {
      const {
        maliciousProduct,
        expectedProduct,
      } = helpers.makeMaliciousProduct();
      return supertest(app)
        .post(`/api/products`)
        .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .send(maliciousProduct)
        .expect(201)
        .expect((res) => {
          expect(res.body.product_code).to.eql(expectedProduct.product_code);
          expect(res.body.product_name).to.eql(expectedProduct.product_name);
          expect(res.body.product_type).to.eql(expectedProduct.product_type);
          expect(res.body.mesh).to.eql(expectedProduct.mesh);
          expect(res.body.hard_three_eighths).to.eql(
            expectedProduct.hard_three_eighths
          );
          expect(res.body.hard_one_quarter).to.eql(
            expectedProduct.hard_one_quarter
          );
          expect(res.body.soft_three_eighths).to.eql(
            expectedProduct.soft_three_eighths
          );
          expect(res.body.prep_bend).to.eql(expectedProduct.prep_bend);
          expect(res.body.prep_weld).to.eql(expectedProduct.prep_weld);
          expect(res.body.weld).to.eql(expectedProduct.weld);
        });
    });
  });

  describe(`DELETE /api/products/:product_id`, () => {
    context(`Given there are no products in the database`, () => {
      it(`responds with 404`, () => {
        const productId = 1234567;
        return supertest(app)
          .delete(`/api/products/${productId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Product doesn't exist` } });
      });
    });

    context(`Given there are products in the database`, () => {
      const testProducts = helpers.makeProductsArray();

      beforeEach("insert products", () => {
        return helpers.seedProducts(db, testProducts);
      });

      it(`responds with 204 and removes the product`, () => {
        const idToRemove = 2;
        const expectedProducts = testProducts.filter(
          (p) => p.id !== idToRemove
        );

        return supertest(app)
          .delete(`/api/products/${idToRemove}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/products`)
              .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedProducts)
          );
      });
    });
  });

  describe(`PATCH /api/products/:product_id`, () => {
    context(`Given no products`, () => {
      it(`responds with 404`, () => {
        const productId = 1234567;
        return supertest(app)
          .patch(`/api/products/${productId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Product doesn't exist` } });
      });
    });

    context(`Given there are products in the database`, () => {
      const testProducts = helpers.makeProductsArray();

      beforeEach("insert products", () => {
        return helpers.seedProducts(db, testProducts);
      });

      it(`responds with 204 and updates the product`, () => {
        const idToUpdate = 2;
        const updatedProduct = {
          product_code: "updated product code",
          product_name: "updated product name",
          product_type: "updated product type",
          mesh: ["updated mesh"],
          hard_three_eighths: ['updated hard 3/8"'],
          hard_one_quarter: ['updated hard 1/4"'],
          soft_three_eighths: ['updated soft 3/8"'],
          prep_bend: ["updated prep bend"],
          prep_weld: ["updated prep weld"],
          weld: ["updated weld"],
        };
        const expectedProduct = {
          ...testProducts[idToUpdate - 1],
          ...updatedProduct,
        };

        return supertest(app)
          .patch(`/api/products/${idToUpdate}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send(updatedProduct)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/products/${idToUpdate}`)
              .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedProduct)
          );
      });

      it(`responds with 400 when required fields are not supplied`, () => {
        const idToUpdate = 2;
        return supertest(app)
          .patch(`/api/products/${idToUpdate}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send({ irrelevantField: "foo" })
          .expect(400, {
            error: {
              message: `Request body must contain 'product code', 'product name', and 'product type'`,
            },
          });
      });
    });
  });
});
