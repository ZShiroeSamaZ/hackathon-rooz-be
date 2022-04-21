const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors")();
const app = express().use(cors);
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());
app.get("/", (_, res) => res.send("It's Work!"));
app.use(routes);

exports.apiV1 = functions.region("asia-southeast1").https.onRequest(app);
