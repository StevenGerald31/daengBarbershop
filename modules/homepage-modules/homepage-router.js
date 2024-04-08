const express = require("express");
const router = express.Router();
const homepageController = require("./homepage-controller");

router.get("/landingpage", homepageController.Landingpage);
router.get("/loginpage", homepageController.Loginpage);
router.post("/login", homepageController.loginUser);

module.exports = router;
