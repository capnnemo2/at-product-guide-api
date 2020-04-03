const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("products endpoints", function() {
  let db;

  const { testProducts } = helpers.makeFixtures();
  console.log(testProducts);

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
  });
});
