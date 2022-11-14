// export enum IdentityProvider {
//     Google = "google",
//     Apple = "apple",
//     Facebook = "facebook",
//     GitHub = "github",
//     LinkedIn = "linkedin",
//     Microsoft = "microsoft",
//     Twitter = "twitter",
//     Yahoo = "yahoo",
//     GameCenter = "gamecenter",
//     PlayGames = "playgames",
//   }

// export type Identity = {
//     id: string;
//     provider: IdentityProvider;
//     user_id: string;
//     username: string | null;
//     email: string | null;
//     credentials: Record<string, unknown>;
//     created_at: Date;
//     updated_at: Date;
//   };
  
// export type User = {
//     id: string;
//     username: string | null;
//     email: string | null;
//     email_verified: boolean;
//     password: string | null;
//     name: string | null;
//     picture: Record<string, unknown>;
//     time_zone: string | null;
//     locale: string | null;
//     admin: boolean;
//     last_login: Date | null;
//     created_at: Date;
//     updated_at: Date;
//     deleted_at: Date | null;
//   };

import knex from 'knex'
import dotenv from "dotenv";
dotenv.config();

const config = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  },
  useNullAsDefault: true
})

export default config