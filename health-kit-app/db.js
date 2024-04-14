require('dotenv').config({path: `${__dirname}/./.env`});
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_URL,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
if (pool) console.log('database started...');
module.exports = pool.promise();

// require('dotenv').config({ path: `${__dirname}/../.env` });
// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: process.env.DB_USER_URL,
//     user: process.env.DB_USER_NAME,
//     database: process.env.DB_USER_DATABASE,
//     password: process.env.DB_USER_PASSWORD,
//     port: process.env.DB_USER_PORT,
// });
// if(pool) console.log('database started...')
// module.exports = pool.promise();
