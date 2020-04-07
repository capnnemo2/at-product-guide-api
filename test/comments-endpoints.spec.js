const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const { TEST_DATABASE_URL } = require("../src/config");

describe("comments endpoints", function () {
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

  describe.only(`GET /api/comments`, () => {
    context(`Given no comments`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/comments")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, []);
      });
    });

    context(`Given there are comments in the database`, () => {
      beforeEach("insert comments", () => {
        return helpers.seedProductsAndComments(db, testProducts, testComments);
      });

      it(`responds with 200 and all of the comments`, () => {
        const expectedComments = testComments.map((comment) =>
          helpers.makeExpectedComment(comment)
        );
        return supertest(app)
          .get("/api/comments")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedComments);
      });
    });

    context(`Given an XSS attack comment`, () => {
      const {
        maliciousComment,
        expectedComment,
      } = helpers.makeMaliciousComment(testProducts);

      beforeEach("insert malicious comment", () => {
        return helpers.seedMaliciousComment(db, testProducts, maliciousComment);
      });

      it(`removes XSS attack content`, () => {
        return supertest(app)
          .get(`/api/comments`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect((res) => {
            expect(res.body[0].user_name).to.eql(expectedComment.user_name);
            expect(res.body[0].content).to.eql(expectedComment.content);
            expect(res.body[0].product_id).to.eql(expectedComment.product_id);
          });
      });
    });
  });
});
