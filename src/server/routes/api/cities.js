var router = require("express").Router();

router.get("/", async function (req, res) {
  let dbQuery =
    "SELECT json_build_object('states', json_agg(distinct(branches.state)) ) FROM branches";
  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set(req.originalUrl, result.rows);
      if (success) console.log(req.originalUrl + " successfully cached");
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/:state", async function (req, res) {
  let state = req.params.state || "";
  let dbQuery =
    "SELECT json_build_object('cities', json_agg(distinct(branches.city)) ) FROM branches where state='" +
    state +
    "'";

  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set(req.originalUrl, result.rows);
      if (success) console.log(req.originalUrl + " successfully cached");
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
