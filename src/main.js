"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser);

app.post("/", (req, res) => {
  res.json({
    message: "OK",
  });
});

module.exports.handler = serverless(app);
