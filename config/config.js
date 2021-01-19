const config = {
  //   postgres: {
  //     user: process.env.DATABASE_USERNAME,
  //     host: process.env.DATABASE_URL,
  //     database: process.env.DATABASE_NAME,
  //     password: process.env.DATABASE_PASSWORD,
  //     port: process.env.DATABASE_PORT,
  //     max: process.env.DATABASE_MAX_CONNECTIONS,
  //     schema: {
  //       recruitment: process.env.RECRUITMENT_DB_SCHEMA,
  //       patent: process.env.PATENT_DB_SCHEMA,
  //       workersRecruitment: process.env.WORKERS_RECRUITMENT_DB_SCHEMA,
  //     },
  //   },
  postgres: {
    user: "ul9rxcbhdjcaz4rbqgxf",
    host: "bzs99waagdexos88fuv0-postgresql.services.clever-cloud.com",
    database: "bzs99waagdexos88fuv0",
    password: "YhrjjqZN0MjmtTGe7R3y",
    port: "5432",
    max: 10,
    schema: "public",
  },
};

module.exports = config;
