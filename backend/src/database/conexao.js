require('dotenv').config();

const { DB_HOST, DB_PORT,DB_USER, DB_NAME, DB_PASS } = process.env;


const knex = require("knex")({
  client: "pg",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    //ssl: { rejectUnauthorized: false }
  },
});

module.exports = knex;

