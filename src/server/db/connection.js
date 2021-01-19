const { Client, Pool } = require("pg");

module.exports = function (postgresConfig) {
  let pool = new Pool({
      user: postgresConfig.user || "",
      host: postgresConfig.host || "",
      database: postgresConfig.database || "",
      password: postgresConfig.password || "",
      port: postgresConfig.port || "",
      max: postgresConfig.max || "",
    }),
    noOfDBConnections = 0;

  pool.on("connect", (client) => {
    let message = "No of active connections : " + pool.totalCount;
  });

  pool.on("remove", (client) => {
    let message = "No of active connections : " + pool.totalCount;
  });

  return pool;
};
