const config = {
  postgres: {
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    max: process.env.DATABASE_MAX_CONNECTIONS,
    schema: "public",
  },
};

module.exports = config;
