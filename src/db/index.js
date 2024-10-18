const {Pool} = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tddproject",
  password: "06Nun@17",
  port: 5432,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}