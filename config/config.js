module.exports = {
  development: {
    username: "asl",
    password: "asl",
    database: "wdv442_space_tracker",
    host: "wdv442-mysql",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "asl",
    password: "asl",
    database: "wdv442_space_tracker_test",
    host: "wdv442-mysql",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: process.env.DB_USER || "asl",
    password: process.env.DB_PASS || "asl",
    database: process.env.DB_NAME || "wdv442_space_tracker",
    host: process.env.DB_HOST || "wdv442-mysql",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  },
};
