var router = require("express").Router();

router.get("/", function (req, res) {
  let queryText = req.query.q || "",
    limit = req.query.limit || "All",
    offset = req.query.offset || 0,
    dbQuery = queryText.length
      ? [
          "select * from branches where",
          "branch like '%" + queryText + "%'",
          "OR ifsc like '%" + queryText + "%'",
          "OR address like '%" + queryText + "%'",
          "OR city like '%" + queryText + "%'",
          "OR district like '%" + queryText + "%'",
          "OR state like '%" + queryText + "%'",
          Number.isNaN(Number(queryText)) ? "" : "OR bank_id = " + queryText,
          "offset " + offset,
          "limit " + limit,
        ].join(" ")
      : "select * from branches";

  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set(req.originalUrl, result.rows);
      if (success) console.log(req.originalUrl + " successfully cached");
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

router.get("/autocomplete", function (req, res) {
  let queryText = req.query.q || "",
    limit = req.query.limit || "All",
    offset = req.query.offset || 0,
    dbQuery = [
      "select * from branches where",
      "branch like '%" + queryText + "%'",
      "offset " + offset,
      "limit " + limit,
    ].join(" ");

  pool
    .query(dbQuery)
    .then((result) => {
      let success = cache.set(req.originalUrl, result.rows);
      if (success) console.log(req.originalUrl + " successfully cached");
      res.send(result.rows);
    })
    .catch((err) => {
      res.send(err.message);
    });
});

module.exports = router;
