const app = require("../src/app");

describe("App", () => {
  it('GET / responds with 200 containing "Hello, world"', () => {
    return supertest(app)
      .get("/")
      .set("Authorization", `${process.env.REACT_APP_API_TOKEN}`)
      .expect(200, "Hello, world");
  });
});
