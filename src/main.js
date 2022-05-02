"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const axios = require("axios");

const router = express.Router();

router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.get("/", async (req, res) => {
  return res.json({
    message: "ok",
    data:
      (await axios.get("https://data.covid19.go.id/public/api/update.json"))
        ?.data || null,
  });
});

app.use("/.netlify/functions/main", router);

module.exports = app;
module.exports.handler = serverless(app);
