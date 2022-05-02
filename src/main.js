"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios");

const router = express.Router();
app.use(bodyParser.json());

router.get("/", async (req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
  };
  return {
    statusCode: 200,
    headers,
    data:
      (await axios.get("https://data.covid19.go.id/public/api/update.json"))
        ?.data || null,
  };
});

app.use("/.netlify/functions/main", router);

module.exports = app;
module.exports.handler = serverless(app);
