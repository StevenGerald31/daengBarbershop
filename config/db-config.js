// const dotenv = require("dotenv");
// dotenv.config();

// module.exports = {
//   HOST: process.env.DB_HOST ?? "localhost",
//   USER: process.env.DB_USER ?? "root",
//   PASSWORD: process.env.DB_PASSWORD ?? "password",
//   DB: process.env.DB_DATABASE ?? "mysql",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "daengbarbershop2",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
