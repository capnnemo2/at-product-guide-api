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

  describe(`GET /api/comments`, () => {
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

  describe(`POST /api/comments`, () => {
    beforeEach("insert products", () => helpers.seedProducts(db, testProducts));
    const testProduct = testProducts[0];

    const requiredFields = ["user_name", "content", "product_id"];
    requiredFields.forEach((field) => {
      const newComment = {
        user_name: "Test name",
        content: "Test comment",
        product_id: testProduct.id,
      };

      it(`responds with 400 and an error when the ${field} is missing`, () => {
        delete newComment[field];
        return supertest(app)
          .post(`/api/comments`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send(newComment)
          .expect(400, {
            error: { message: `Missing '${field}' in request body` },
          });
      });
    });
    it(`creates a comment, responding with 201 and the new comment`, () => {
      const newComment = {
        user_name: "Test name",
        content: "Test comment",
        product_id: testProduct.id,
      };

      return supertest(app)
        .post(`/api/comments`)
        .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .send(newComment)
        .expect(201)
        .expect((res) => {
          expect(res.body.user_name).to.eql(newComment.user_name);
          expect(res.body.content).to.eql(newComment.content);
          expect(res.body.product_id).to.eql(newComment.product_id);
        })
        .then((postRes) =>
          supertest(app)
            .get(`/api/comments/${postRes.body.id}`)
            .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            .expect(postRes.body)
        );
    });

    it(`removes XSS attack content from response`, () => {
      const {
        maliciousComment,
        expectedComment,
      } = helpers.makeMaliciousComment(testProducts);

      return supertest(app)
        .post(`/api/comments`)
        .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .send(maliciousComment)
        .expect(201)
        .expect((res) => {
          expect(res.body.user_name).to.eql(expectedComment.user_name);
          expect(res.body.content).to.eql(expectedComment.content);
          expect(res.body.product_id).to.eql(expectedComment.product_id);
        });
    });
  });

  describe(`GET /api/comments/:comment_id`, () => {
    context(`Given no comments`, () => {
      it(`responds with 404`, () => {
        const commentId = 1234567;
        return supertest(app)
          .get(`/api/comments/${commentId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Comment doesn't exist` } });
      });
    });

    context(`Given there are comments in the database`, () => {
      beforeEach("insert comments", () => {
        return helpers.seedProductsAndComments(db, testProducts, testComments);
      });

      it(`responds with 200 and the specified comment`, () => {
        const commentId = 2;
        const expectedComment = helpers.makeExpectedComment(
          testComments[commentId - 1]
        );

        return supertest(app)
          .get(`/api/comments/${commentId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedComment);
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
          .get(`/api/comments/${maliciousComment.id}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200)
          .expect((res) => {
            expect(res.body.user_name).to.eql(expectedComment.user_name);
            expect(res.body.content).to.eql(expectedComment.content);
            expect(res.body.product_id).to.eql(expectedComment.product_id);
          });
      });
    });
  });

  describe(`DELETE /api/comments/:comment_id`, () => {
    context(`Given there are no comments in the database`, () => {
      it(`responds with 404`, () => {
        const commentId = 1234567;
        return supertest(app)
          .delete(`/api/comments/${commentId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Comment doesn't exist` } });
      });
    });

    context(`Given there are comments in the database`, () => {
      const testComments = helpers.makeCommentsArray(testProducts);

      beforeEach("insert comments", () => {
        return helpers.seedProductsAndComments(db, testProducts, testComments);
      });

      it(`responds with 204 and removes the product`, () => {
        const idToRemove = 2;
        const expectedComments = testComments.filter(
          (c) => c.id !== idToRemove
        );

        return supertest(app)
          .delete(`/api/comments/${idToRemove}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/comments`)
              .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedComments)
          );
      });
    });
  });

  describe(`PATCH /api/comments/:comment_id`, () => {
    context(`Given no comments`, () => {
      it(`responds with 404`, () => {
        const commentId = 1234567;
        return supertest(app)
          .patch(`/api/comments/${commentId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Comment doesn't exist` } });
      });
    });

    context(`Given there are comments in the database`, () => {
      const testComments = helpers.makeCommentsArray(testProducts);

      beforeEach("insert comments", () => {
        return helpers.seedProductsAndComments(db, testProducts, testComments);
      });

      it(`responds with 204 and updates the product`, () => {
        const idToUpdate = 2;
        const updatedComment = {
          user_name: "updated name",
          content: "updated content",
          product_id: testProducts[2].id,
        };
        const expectedComment = {
          ...testComments[idToUpdate - 1],
          ...updatedComment,
        };

        return supertest(app)
          .patch(`/api/comments/${idToUpdate}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send(updatedComment)
          .expect(204)
          .then((res) =>
            supertest(app)
              .get(`/api/comments/${idToUpdate}`)
              .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
              .expect(expectedComment)
          );
      });

      it(`responds with 400 when required fields are not supplied`, () => {
        const idToUpdate = 2;
        return supertest(app)
          .patch(`/api/comments/${idToUpdate}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send({ irrelevantField: "foo" })
          .expect(400, {
            error: {
              message: `Request body must contain either 'user_name' or 'content'`,
            },
          });
      });
    });
  });
});
