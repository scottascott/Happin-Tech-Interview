"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var post_1 = require("./controllers/post");
var router = (0, express_1.Router)();
exports.router = router;
router.post("/crawl", (0, express_validator_1.body)("url").exists().isURL(), post_1.crawl);
