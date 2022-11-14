import knex from 'knex'
import dotenv from "dotenv";
dotenv.config();

// const config = knex({
//   client: 'pg',
//   connection: {
//     host: process.env.POSTGRES_HOST,
//     user: process.env.POSTGRES_USER,
//     password: process.env.POSTGRES_PASSWORD,
//     database: process.env.POSTGRES_DB
//   },
//   useNullAsDefault: true
// })

const config = knex({
  client: 'mysql',
  connection: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: Number(process.env.MYSQL_PORT)
  },
  useNullAsDefault: true
})

export default config