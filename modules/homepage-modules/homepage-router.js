const express = require("express");
const router = express.Router();
const homepageController = require("./homepage-controller");

router.get("/landingpage", homepageController.Landingpage);

module.exports = router;
