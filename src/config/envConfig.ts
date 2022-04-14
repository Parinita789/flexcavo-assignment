import dotenv from 'dotenv';

dotenv.config();

export default {
  NODE_ENV : process.env.NODE_ENV,
  PORT : Number(process.env.PORT),
  KEEP_ALIVE_TIMEOUT : Number(process.env.KEEP_ALIVE_TIMEOUT),
  SERVER_TIMEOUT: Number(process.env.SERVER_TIMEOUT),
  DATABASE_CONFIG: {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING
  },
}