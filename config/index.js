const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  APP_PORT,
  DB_HOST_NAME,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_TYPE,
  SALT_ROUND,
  JWT_KEY,
  REFRESH_SECRET
} = process.env;
