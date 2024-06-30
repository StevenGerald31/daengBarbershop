const express = require("express");
const router = express.Router();
const homepageController = require("./homepage-controller");

router.get("/landingpage", homepageController.Landingpage);
router.get("/loginpage", homepageController.Loginpage);
router.post("/login", homepageController.loginUser);
router.get("/booking/:lokasi", homepageController.data_booking);
router.get("/pelanggan/:lokasi", homepageController.data_pelanggan);

module.exports = router;
