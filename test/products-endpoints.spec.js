const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("products endpoints", function() {
  let db;

  const { testProducts } = helpers.makeFixtures();

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL
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
          .expect(200, []);
      });
    });

    context(`Given there are products in the database`, () => {
      beforeEach("insert products", () =>
        helpers.seedProducts(db, testProducts)
      );

      it(`responds with 200 and all of the products`, () => {
        const expectedProducts = testProducts.map(product =>
          helpers.makeExpectedProduct(product)
        );
        return supertest(app)
          .get("/api/products")
          .expect(200, expectedProducts);
      });
    });

    context(`Given as XSS attack product`, () => {
      const testProduct = helpers.makeProductsArray()[1];
      const {
        maliciousProduct,
        expectedProduct
      } = helpers.makeMaliciousProduct(testProduct);

      beforeEach("insert malicious product", () => {
        return helpers.seedMaliciousProduct(db, maliciousProduct);
      });

      it(`removes XSS attack content`, () => {
        return supertest(app)
          .get("/api/products")
          .expect(200)
          .expect(res => {
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
});
