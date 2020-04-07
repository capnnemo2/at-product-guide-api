require("dotenv").config();

console.log(process.env.SSL);
console.log(process.env.DATABASE_URL);

module.exports = {
  migrationsDirectory: "migrations",
  driver: "pg",
  connectionString:
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DATABASE_URL + "?sslmode=require"
      : process.env.DATABASE_URL,
  ssl: !!process.env.SSL,
};
