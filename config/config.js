const config = {
  postgres: {
    user: process.env.DATABASE_USERNAME,
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
    max: process.env.DATABASE_MAX_CONNECTIONS,
    schema: {
      recruitment: process.env.RECRUITMENT_DB_SCHEMA,
      patent: process.env.PATENT_DB_SCHEMA,
      workersRecruitment: process.env.WORKERS_RECRUITMENT_DB_SCHEMA,
    },
  },
};

module.exports = config;
