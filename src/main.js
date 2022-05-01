"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const router = express.Router();
app.use(bodyParser.json());

router.get("/", (req, res) => {
  return res.json({
    message: "OK",
    data: (await axios.get("https://data.covid19.go.id/public/api/update.json"))?.data || null
  });
});

app.use("/.netlify/functions/server", router);

module.exports = app;
module.exports.handler = serverless(app);
