"use strict";
exports.__esModule = true;
var express = require("express");
var cors = require("cors");
var body_parser_1 = require("body-parser");
var container_1 = require("./container");
var routes_1 = require("./routes/event/routes");
var app = express();
app.enable("trust proxy");
app.use(cors());
// to parse: application/json
app.use((0, body_parser_1.json)({ limit: "50mb" }));
// to parse: application/x-www-urlencoded
app.use((0, body_parser_1.urlencoded)({ limit: "50mb", extended: true }));
app.use(function (req, _, next) {
    req.scope = container_1["default"].createScope();
    next(); //here should have a next
});
app.use("/events", routes_1.router);
app.use(function (_req, res) {
    return res.status(404).json({ code: 404, message: "Endpoint not exist" });
});
app.use(function (err, req, res, next) {
    return res.status(400).json({ message: err.message });
});
app.listen(4200);
