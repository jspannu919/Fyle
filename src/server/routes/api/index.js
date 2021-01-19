var router = require("express").Router();

router.get("/heartbeat", (req, res) =>
  res.status(200).send("Api is working fine!")
);
router.use("/branches", require("./branches"));
router.use("/banks", require("./banks"));
router.use("/cities", require("./cities"));

module.exports = router;
