const express = require("express");
const path = require("path");
const app = express();
const dbConnection = require("./db/connection");
const appConfig = require("../../config/config");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const port = process.env.PORT || 5000;

global.appConfig = appConfig;
global.pool = dbConnection(appConfig.postgres);
global.cache = cache;

//cache serving custom middleware
app.use((req, res, next) => {
  const url = req.originalUrl;
  const value = cache.get(url);
  if (value !== undefined) {
    console.log("Serving from cache " + url);
    res.send(value);
  } else next();
});

//serving react bundle
app.use(express.static(path.join(__dirname, "../client/build")));
//api routes
app.use(require("./routes"));

app.listen(port, () => console.log("Server Up and Running!"));
