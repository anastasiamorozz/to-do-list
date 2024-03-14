const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: '123456',
    host: "localhost",
    port: 5432,
    database: "todolist"
});

module.exports = pool;

// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//       host: 'localhost',
//       user: 'postgres',
//       password: '123456',
//       database: 'todolist',
//     },
//     migrations: {
//         directory: './migrations' 
//     },
//       seeds: {
//         directory: './seeds'
//     }
//   });
  
  // module.exports = knex;
  