var router = require("express").Router();

router.get("/", function (req, res) {
  let dbQuery =
    "SELECT json_build_object('states', json_agg(distinct(branches.state)) ) FROM branches";
  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set("/api/cities" + req._parsedUrl.path, result.rows);
      if (success)
        console.log(
          "/api/cities" + req._parsedUrl.path + " successfully cached"
        );
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/:state", function (req, res) {
  let state = req.params.state || "";
  let dbQuery =
    "SELECT json_build_object('cities', json_agg(distinct(branches.city)) ) FROM branches where state='" +
    state +
    "'";

  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set("/api/cities" + req._parsedUrl.path, result.rows);
      if (success)
        console.log(
          "/api/cities" + req._parsedUrl.path + " successfully cached"
        );
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
