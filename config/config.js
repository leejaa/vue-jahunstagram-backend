const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: "infotech@30",
    database: 'vue-jahunstagram',
    host: process.env.DB_URL,
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: "infotech@30",
    database: 'vue-jahunstagram',
    host: process.env.DB_URL,
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: "infotech@30",
    database: 'vue-jahunstagram',
    host: process.env.DB_URL,
    dialect: 'mysql',
  },
};
