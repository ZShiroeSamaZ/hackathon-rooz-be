const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const cors = require("cors")({ credentials: true, origin: true });
const app = express().use(cors);
const cookiesMiddleware = require('universal-cookie-express')();
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cookiesMiddleware);
app.get("/", (_, res) => res.send("It's Work!"));
app.use(routes);

exports.apiV1 = functions.region("asia-southeast1").https.onRequest(app);
