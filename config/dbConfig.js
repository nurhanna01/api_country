import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.PORT,
};
// console.log(dbConfig);
export default dbConfig;
