var router = require("express").Router();

router.get("/", function (req, res) {
  let dbQuery = "select * from banks";

  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set("/api/banks" + req._parsedUrl.path, result.rows);
      if (success)
        console.log(
          "/api/banks" + req._parsedUrl.path + " successfully cached"
        );
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/:id", function (req, res) {
  let id = req.params.id || "",
    dbQuery = "select * from banks where id=" + id,
    responseData = {};

  pool
    .query(dbQuery)
    .then((result) => {
      if (result.rows[0]) {
        responseData.name = result.rows[0].name;
        let dbSubQuery = "select * from branches where bank_id=" + id;
        pool.query(dbSubQuery).then((result) => {
          responseData.branches = result.rows;
          let success = cache.set(
            "/api/banks" + req._parsedUrl.path,
            responseData
          );
          if (success)
            console.log(
              "/api/banks" + req._parsedUrl.path + " successfully cached"
            );
          res.send(responseData);
        });
      } else res.send("Bank not found");
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
