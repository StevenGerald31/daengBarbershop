const express = require("express");
const router = express.Router();
const adminController = require("./admin-controller");

router.get("/dashboard", adminController.pageDashboard);
router.get("/dataProduk", adminController.dataProduk);


module.exports = router;