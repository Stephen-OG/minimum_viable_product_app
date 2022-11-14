import * as Knex from 'knex'
import {knex} from "knex";
import dotenv from "dotenv";
dotenv.config();

export const config = {
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  // migrations: {
  //   // This is missing from the TypeScript types currently.
  //   stub: 'migration.stub'
  // },
//   seeds: {
//     directory: "./seeds"
//   }
}

const instance = knex(config);

instance
  .raw('select 1')
  .then(() => {
    console.log(`Connected to database - OK`)
  })
  .catch(err => {
    console.log(`Failed to connect to database: ${err}`)
    process.exit(1)
  })

export const db = () => instance

// Returns a timestamp suitable for inserting into Postgres
export const timestamp = (): string => new Date().toUTCString()

// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//       host : '127.0.0.1',
//       port : 3306,
//       user : 'your_database_user',
//       password : 'your_database_password',
//       database : 'myapp_test'
//     }
//   });